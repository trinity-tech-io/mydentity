import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ActivityType,
  AuthChallenge,
  Browser,
  Prisma,
  User,
  UserShadowKey,
  UserShadowKeyType
} from '@prisma/client/main';
import { VerifiedAuthenticationResponse, VerifiedRegistrationResponse, VerifyAuthenticationResponseOpts, VerifyRegistrationResponseOpts, verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/server/script/deps';
import { randombytes_buf, ready } from 'libsodium-wrappers-sumo';
import * as NodeCache from 'node-cache';
import { Signature as Ed25519Signature, KeyPair as SignatureKeyPair } from 'src/crypto/ed25519';
import { PasswordHash } from 'src/crypto/passwordhash';
import { SecretBox } from 'src/crypto/secretbox';
import { AppException } from 'src/exceptions/app-exception';
import { KeyRingExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityService } from "../activity/activity.service";
import { AuthKeyInput } from './dto/auth-key-input';
import { AuthChallengeEntity } from './entities/auth-challenge.entity';

@Injectable()
export class KeyRingService {
  private static UNKNOWN_USER_ID = "unknown-user-id";
  private static CHALLENGE_EXPIRATION = 5 * 60 * 1000;
  private static DEFAULT_TTL = 600; // 10 minutes

  private serverKeyPair: SignatureKeyPair;
  private webautnOrigin: string;
  private webauthnRelyingParty: string;

  private masterKeyCache: NodeCache;

  public static async init(): Promise<void> {
    await ready;
    await Ed25519Signature.init();
    await SecretBox.init();
    await PasswordHash.init();
  }

  constructor(private readonly prisma: PrismaService, private readonly activityService: ActivityService) {
    let v = process.env.WEBAUTHN_ORIGIN;
    if (!v)
      throw new AppException(KeyRingExceptionCode.InvalidKeyRingConfig,
        "Missing WebAuthn origin in the env file.", HttpStatus.INTERNAL_SERVER_ERROR);

    this.webautnOrigin = v.trim();

    v = process.env.WEBAUTHN_RELYING_PARTY;
    if (!v)
      throw new AppException(KeyRingExceptionCode.InvalidKeyRingConfig,
        "Missing WebAuthn relying party in the env file.", HttpStatus.INTERNAL_SERVER_ERROR);

    this.webauthnRelyingParty = v.trim();

    const sk = process.env.KEY_RING_PRIVATEKEY;
    if (!sk)
      throw new AppException(KeyRingExceptionCode.InvalidKeyRingConfig,
        "Missing the private key for KeyRing in the env file.", HttpStatus.INTERNAL_SERVER_ERROR);

    try {
      this.serverKeyPair = SignatureKeyPair.fromPrivateKey(Buffer.from(sk.trim(), "hex"));
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.InvalidKeyRingConfig,
        "Invalid private key for KeyRing in the env file: " + e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const ttlValue = process.env.KEY_RING_TTL;
    const ttl = ttlValue ? Number(ttlValue) : KeyRingService.DEFAULT_TTL;

    this.masterKeyCache = new NodeCache({
      stdTTL: ttl,
      checkperiod: 300,
      useClones: false,
      deleteOnExpire: true
    });
  }

  private async getChallenge(challengeId: string): Promise<AuthChallenge> {
    const challenge = await this.prisma.authChallenge.findUnique({
      where: {
        id: challengeId,
        createdAt: {
          gte: new Date(Date.now() - KeyRingService.CHALLENGE_EXPIRATION)
        }
      }
    });

    return challenge;
  }

  private async verifyWebAuthnRegistation(responseJson: string, challengeId: string): Promise<VerifiedRegistrationResponse> {
    const challenge = await this.getChallenge(challengeId);
    if (!challenge)
      throw new AppException(KeyRingExceptionCode.InvalidChallengeId, "Invalid challenge id or expired", HttpStatus.BAD_REQUEST);

    const response: RegistrationResponseJSON = JSON.parse(responseJson);
    let result: VerifiedRegistrationResponse = null;
    try {
      const opts: VerifyRegistrationResponseOpts = {
        response: response,
        expectedChallenge: challenge.content,
        expectedOrigin: this.webautnOrigin,
        expectedRPID: this.webauthnRelyingParty,
        requireUserVerification: false,
      };
      result = await verifyRegistrationResponse(opts);
      return result;
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify error: " + e, HttpStatus.FORBIDDEN);
    }
  }

  private async verifyWebAuthnAuthenticatoin(responseJson: string, challengeId: string, shadow: UserShadowKey): Promise<VerifiedAuthenticationResponse> {
    const challenge = await this.getChallenge(challengeId);
    if (!challenge)
      throw new AppException(KeyRingExceptionCode.InvalidChallengeId, "Invalid challenge id or expired", HttpStatus.BAD_REQUEST);

    const response: AuthenticationResponseJSON = JSON.parse(responseJson);
    try {
      const opts: VerifyAuthenticationResponseOpts = {
        response: response,
        expectedChallenge: challenge.content,
        expectedOrigin: this.webautnOrigin,
        expectedRPID: this.webauthnRelyingParty,
        authenticator: {
          counter: shadow.counter,
          credentialID: Buffer.from(shadow.credentialId, "hex"),
          credentialPublicKey: Buffer.from(shadow.key, "hex")
        },
        requireUserVerification: false,
      };
      const result = await verifyAuthenticationResponse(opts);
      this.updateCounter(shadow.userId, shadow.keyId, result.authenticationInfo.newCounter);
      return result;
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify error: " + e, HttpStatus.FORBIDDEN);
    }
  }

  private async updateCounter(userId: string, keyId: string, counter: number): Promise<void> {
    await this.prisma.userShadowKey.update({
      where: {
        userId_keyId: {
          userId: userId,
          keyId: keyId
        }
      },
      data: {
        counter: counter
      }
    });
  }

  private async addShadowKey(userId: string, keyId: string, key: string, credentialId: string, counter: number, type: UserShadowKeyType, secretKey: Uint8Array, browserId: string): Promise<UserShadowKey> {
    let authKey: string;
    let password: string | Uint8Array;

    if (type == UserShadowKeyType.PASSWORD) {
      // Create the password encrypted shadow key
      authKey = PasswordHash.hash(key);
      password = key;
    } else if (type == UserShadowKeyType.WEBAUTHN) {
      // Create the device passkey encrypted shadow key
      authKey = key;
      const k1 = Buffer.from(key, 'hex');
      const k2 = Buffer.from(this.serverKeyPair.privateKey()._bytes());
      password = Buffer.concat([k1, k2]);
    }

    const encryptedSecretKey = SecretBox.encryptWithPassword(secretKey, password);

    return this.prisma.userShadowKey.create({
      data: {
        userId: userId,
        keyId: keyId,
        key: authKey,
        credentialId: credentialId,
        counter: counter,
        type: type,
        secretKey: Buffer.from(encryptedSecretKey).toString('hex'),
        browserId: browserId
      },
      include: {
        browser: true // Needed by several APIs
      }
    });
  }

  private async removeShadowKey(userId: string, keyId: string): Promise<UserShadowKey> {
    try {
      const shadow = await this.prisma.userShadowKey.delete({
        where: {
          userId_keyId: {
            userId: userId,
            keyId: keyId,
          }
        }
      });

      return shadow;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new AppException(KeyRingExceptionCode.KeyNotExists, "Key not exists", HttpStatus.NOT_FOUND);
      } else {
        throw new AppException(KeyRingExceptionCode.DatabaseError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  private async getShadowKey(keyId: string, userId?: string, includeUser?: boolean): Promise<UserShadowKey & { user?: User }> {
    if (userId) {
      return this.prisma.userShadowKey.findUnique({
        where: {
          userId_keyId: {
            userId: userId,
            keyId: keyId
          },
        },
        include: {
          user: includeUser ? true : false
        }
      });
    } else {
      return this.prisma.userShadowKey.findFirst({
        where: {
          keyId: keyId
        },
        include: {
          user: includeUser ? true : false
        }
      });
    }
  }

  private getSecretKey(shadow: UserShadowKey, key: string): Uint8Array {
    let password: string | Uint8Array;
    if (shadow.type == UserShadowKeyType.PASSWORD) {
      password = key;
    } else if (shadow.type == UserShadowKeyType.WEBAUTHN) {
      const k1 = Buffer.from(key, 'hex');
      const k2 = Buffer.from(this.serverKeyPair.privateKey()._bytes());
      password = Buffer.concat([k1, k2]);
    }

    const encryptedSecretKey = Buffer.from(shadow.secretKey, 'hex');
    return SecretBox.decryptWithPassword(encryptedSecretKey, password);
  }

  async bindKey(newKey: AuthKeyInput, browserOrId: Browser | string, user: User): Promise<UserShadowKey> {
    const browserId = browserOrId && (typeof browserOrId === "string" ? browserOrId : browserOrId.id);
    const browser = browserOrId && (typeof browserOrId === "string" ? null : browserOrId);

    const shadow = await this.prisma.userShadowKey.findFirst({
      where: {
        userId: user.id
      }
    })

    let secretKey: Uint8Array;
    if (shadow) {
      // KeyRing exists, get the cached secret key if authorized
      const masterKey = this.getMasterKey(user.id, browserId);
      if (masterKey === undefined)
        throw new AppException(KeyRingExceptionCode.Unauthorized, "User unauthorized", HttpStatus.FORBIDDEN);

      secretKey = Buffer.from(masterKey, "hex");
    } else {
      // New secret key for the new key ring
      const secretBox = SecretBox.random();
      secretKey = secretBox._bytes();
    }

    if (!newKey.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the key id", HttpStatus.BAD_REQUEST);

    let key: string = null;
    let credentialId: string = null;
    let counter = 0;
    if (newKey.type == UserShadowKeyType.WEBAUTHN) {
      if (!newKey.key)
        throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the WebAuthn response", HttpStatus.BAD_REQUEST);

      if (!newKey.challengeId)
        throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the challenge id", HttpStatus.BAD_REQUEST);

      const result = await this.verifyWebAuthnRegistation(newKey.key, newKey.challengeId);
      if (!result.verified)
        throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify failed", HttpStatus.FORBIDDEN);

      key = Buffer.from(result.registrationInfo.credentialPublicKey).toString("hex");
      credentialId = Buffer.from(result.registrationInfo.credentialID).toString("hex");
      counter = result.registrationInfo.counter;
    } else if (newKey.type == UserShadowKeyType.PASSWORD) {
      if (!newKey.key)
        throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing password", HttpStatus.BAD_REQUEST);

      key = newKey.key;
    }

    const result = await this.addShadowKey(user.id, newKey.keyId, key, credentialId, counter, newKey.type, secretKey, browserId);

    if (browser) { // Possibly bo browser given if we come from API creation
      if (newKey.type === UserShadowKeyType.WEBAUTHN)
        await this.activityService.createActivity(user, { type: ActivityType.BIND_BROWSER, browserId: browser.id, browserName: browser.name });
      else if (newKey.type === UserShadowKeyType.PASSWORD)
        await this.activityService.createActivity(user, { type: ActivityType.NEW_ACCOUNT, browserId: browser.id, browserName: browser.name });
    }

    return result;
  }

  async removeKey(keyId: string, user: User): Promise<boolean> {
    const count = await this.prisma.userShadowKey.count({
      where: {
        userId: user.id
      }
    });

    if (count <= 2)
      throw new AppException(KeyRingExceptionCode.CanNotRemoveKey, "Can not remove the last 2 keys", HttpStatus.FORBIDDEN);

    return (await this.removeShadowKey(user.id, keyId)) != null;
  }

  async changePassword(newPassword: string, browserId: string, user: User): Promise<UserShadowKey[]> {
    // get the cached secret key if authorized
    const masterKey = this.getMasterKey(user.id, browserId);
    if (masterKey === undefined)
      throw new AppException(KeyRingExceptionCode.Unauthorized, "User unauthorized", HttpStatus.FORBIDDEN);

    const secretKey = Buffer.from(masterKey, "hex");

    if (!newPassword)
      throw new AppException(KeyRingExceptionCode.WrongPassword, "Invalid new password", HttpStatus.FORBIDDEN);

    const shadows = await this.prisma.userShadowKey.findMany({
      where: {
        userId: user.id,
        type: UserShadowKeyType.PASSWORD
      }
    });

    if (!shadows)
      throw new AppException(KeyRingExceptionCode.KeyNotExists, "Authorization key for password not exists", HttpStatus.FORBIDDEN)

    // IMPORTANT: should re-encrypt one by one for the security reason
    // Prisma transaction with code block:
    //   https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions
    const keys = await this.prisma.$transaction<UserShadowKey[]>(async (tx) => {
      const shadowKeys: UserShadowKey[] = [];

      for (const shadow of shadows) {
        const authKey = PasswordHash.hash(newPassword);
        const encryptedSecretKey = SecretBox.encryptWithPassword(secretKey, newPassword);

        const newKey = await tx.userShadowKey.update({
          where: {
            userId_keyId: {
              userId: user.id,
              keyId: shadow.keyId
            }
          },
          data: {
            key: authKey,
            secretKey: Buffer.from(encryptedSecretKey).toString('hex')
          }
        });

        shadowKeys.push(newKey);
      }

      return shadowKeys;
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    });

    await this.activityService.createActivity(user, { type: ActivityType.PASSWORD_CHANGED });

    return keys;
  }

  async getAllKeys(user: User): Promise<UserShadowKey[]> {
    const keys = await this.prisma.userShadowKey.findMany({
      where: {
        userId: user.id
      },
      include: {
        browser: true
      }
    });

    if (!keys)
      throw new AppException(KeyRingExceptionCode.KeyRingNotExists, "No keyring exists for user", HttpStatus.NOT_FOUND);

    // clear the secret key, should not touch it out of the keyring scope
    for (const key of keys)
      key.secretKey = ""

    return keys;
  }

  /**
   * decrypt the master key with auth key. internal only!!!
   */
  async _decryptMasterKey(authKey: AuthKeyInput, browserId: string, user: User): Promise<string> {
    if (!user)
      throw new AppException(KeyRingExceptionCode.Unauthorized, "Missing user", HttpStatus.FORBIDDEN);

    if (!authKey.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the key id", HttpStatus.BAD_REQUEST);

    if (authKey.type == UserShadowKeyType.WEBAUTHN) {
      if (!authKey.challengeId)
        throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the challenge id", HttpStatus.BAD_REQUEST);

      if (!authKey.key)
        throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the WebAuthn response", HttpStatus.BAD_REQUEST);
    } else if (authKey.type == UserShadowKeyType.PASSWORD) {
      if (!authKey.key)
        throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing password", HttpStatus.BAD_REQUEST);
    }

    const shadow = await this.getShadowKey(authKey.keyId, user.id);
    if (!shadow)
      throw new AppException(KeyRingExceptionCode.KeyNotExists, "Authorization key not exists", HttpStatus.FORBIDDEN);

    let key: string;
    if (authKey.type == UserShadowKeyType.WEBAUTHN) {
      const result = await this.verifyWebAuthnAuthenticatoin(authKey.key, authKey.challengeId, shadow);
      if (!result.verified)
        throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify failed", HttpStatus.FORBIDDEN);

      key = shadow.key;
    } else if (authKey.type == UserShadowKeyType.PASSWORD) {
      if (!PasswordHash.verify(shadow.key, authKey.key))
        throw new AppException(KeyRingExceptionCode.WrongPassword, "Wrong password", HttpStatus.FORBIDDEN);

      key = authKey.key;
    }

    const masterKey = Buffer.from(this.getSecretKey(shadow, key)).toString("hex");
    return masterKey;
  }

  /**
   * Unlocks a signed in user's master key during a few minutes.
   */
  async unlockMasterKey(authKey: AuthKeyInput, browserId: string, user: User): Promise<boolean> {
    const masterKey = await this._decryptMasterKey(authKey, browserId, user);
    this.masterKeyCache.set(user.id + "-" + browserId, masterKey);
    return true;
  }

  getMasterKey(userId: string, browserId: string, throwIfNotExists = true): string | undefined {
    const id = userId + "-" + browserId;
    const masterKey: string = this.masterKeyCache.get(id);
    if (masterKey) {
      this.masterKeyCache.ttl(id);
    } else {
      if (throwIfNotExists)
        throw new AppException(KeyRingExceptionCode.Unauthorized, "Unauthorized to access master key", HttpStatus.UNAUTHORIZED);
    }

    return masterKey;
  }

  checkMasterKeyLock(browserId: string, userId: string): boolean {
    const id = userId + "-" + browserId;
    const masterKey: string = this.masterKeyCache.get(id);
    if (masterKey) {
      return true;
    } else {
      throw new AppException(KeyRingExceptionCode.Unauthorized, "Unauthorized to access master key", HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserFromWebAuthnResponse(authKey: AuthKeyInput): Promise<User | null> {
    if (authKey.type != UserShadowKeyType.WEBAUTHN)
      throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Only accept the WebAuthn response", HttpStatus.BAD_REQUEST);

    if (!authKey.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the key id", HttpStatus.BAD_REQUEST);

    if (!authKey.challengeId)
      throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the challenge id", HttpStatus.BAD_REQUEST);

    if (!authKey.key)
      throw new AppException(KeyRingExceptionCode.InvalidAuthKey, "Missing the WebAuthn response", HttpStatus.BAD_REQUEST);

    const shadow = await this.getShadowKey(authKey.keyId, null, true);
    if (!shadow)
      return null;

    const result = await this.verifyWebAuthnAuthenticatoin(authKey.key, authKey.challengeId, shadow);
    if (!result.verified)
      throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify failed", HttpStatus.FORBIDDEN);

    return shadow.user;
  }

  async generateChallenge(): Promise<AuthChallengeEntity> {
    const content = randombytes_buf(128, "hex");

    // remove the expired entries
    await this.prisma.authChallenge.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - KeyRingService.CHALLENGE_EXPIRATION)
        }
      }
    });

    const challenge = await this.prisma.authChallenge.create({
      data: {
        content: content
      }
    });

    return challenge
  }
}
