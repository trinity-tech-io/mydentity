import { HttpStatus, Injectable } from '@nestjs/common';
import { Challenge, Prisma, User, UserShadowKey, UserShadowKeyType } from '@prisma/client';
import { VerifiedAuthenticationResponse, VerifiedRegistrationResponse, VerifyAuthenticationResponseOpts, VerifyRegistrationResponseOpts, verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/server/script/deps';
import { randombytes_buf, ready } from 'libsodium-wrappers-sumo';
import { Signature as Ed25519Signature, KeyPair as SignatureKeyPair } from 'src/crypto/ed25519';
import { PasswordHash } from 'src/crypto/passwordhash';
import { SecretBox } from 'src/crypto/secretbox';
import { AppException } from 'src/exceptions/app-exception';
import { KeyRingExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthKeyInput } from './dto/auth-key-input';
import { BindKeyInput } from './dto/bind-key-input';
import { RemoveKeyInput } from './dto/remove-key-input';
import { ChallengeEntity } from './entities/challenge.entity';

@Injectable()
export class KeyRingService {
  private static UNKNOWN_USER_ID = "unknown-user-id";
  private static CHALLENGE_EXPIRATION = 5 * 60 * 1000;

  private serverKeyPair: SignatureKeyPair;
  private webautnOrigin: string;
  private webauthnRelyingParty: string;

  public static async init(): Promise<void> {
    await ready;
    await Ed25519Signature.init();
    await SecretBox.init();
    await PasswordHash.init();
  }

  constructor(private prisma: PrismaService) {
    this.webautnOrigin = `${process.env.WEBAUTHN_ORIGIN}`;
    this.webauthnRelyingParty = `${process.env.WEBAUTHN_RELYING_PARTY}`;

    const sk = Buffer.from(`${process.env.KEY_RING_PRIVATEKEY}`, 'hex');

    try {
      this.serverKeyPair = SignatureKeyPair.fromPrivateKey(sk);
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.InvalidPrivateKey,
        "Invalid server private key from the env file: " + e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async getChallenge(challengeId: string): Promise<Challenge> {
    const challenge = await this.prisma.challenge.findUnique({
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
      throw new AppException(KeyRingExceptionCode.NoChallenge, "No challenge or expired", HttpStatus.BAD_REQUEST);

    const response: RegistrationResponseJSON = JSON.parse(responseJson);
    let result: VerifiedRegistrationResponse = null;
    try {
      const opts: VerifyRegistrationResponseOpts = {
        response: response,
        expectedChallenge: challenge.content,
        expectedOrigin: this.webautnOrigin,
        expectedRPID: this.webauthnRelyingParty,
        requireUserVerification: true,
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
      throw new AppException(KeyRingExceptionCode.NoChallenge, "No challenge or expired", HttpStatus.BAD_REQUEST);

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
        requireUserVerification: true,
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

  private async addShadowKey(userId: string, keyId: string, key: string, credentialId: string, counter: number, type: UserShadowKeyType, secretKey: Uint8Array): Promise<UserShadowKey> {
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

    return await this.prisma.userShadowKey.create({
      data: {
        userId: userId,
        keyId: keyId,
        key: authKey,
        credentialId: credentialId,
        counter: counter,
        type: type,
        secretKey: Buffer.from(encryptedSecretKey).toString('hex')
      }
    });
  }

  private async removeShadowKey(userId: string, keyId: string): Promise<void> {
    try {
      await this.prisma.userShadowKey.delete({
        where: {
          userId_keyId: {
            userId: userId,
            keyId: keyId,
          }
        }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new AppException(KeyRingExceptionCode.KeyNotExists, "Key not exists", HttpStatus.NOT_FOUND);
      } else {
        throw new AppException(KeyRingExceptionCode.DBInternalError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  private async getShadowKey(userId: string, keyId: string): Promise<UserShadowKey> {
    const shadow = await this.prisma.userShadowKey.findUnique({
      where: {
        userId_keyId: {
          userId: userId,
          keyId: keyId
        }
      }
    });

    return shadow;
  }

  private async getSecretKey(shadow: UserShadowKey, key: string): Promise<Uint8Array> {
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

  async bindKey(input: BindKeyInput, user: User): Promise<UserShadowKey> {
    const key = await this.prisma.userShadowKey.findFirst({
      where: {
        userId: user.id
      }
    })

    let secretKey: Uint8Array;
    if (key) {
      if (!input.authType)
        throw new AppException(KeyRingExceptionCode.UnsupportedAuthenticationKey, "Unknown authentication key type", HttpStatus.BAD_REQUEST);

      if (!input.authKeyId)
          throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing key id", HttpStatus.BAD_REQUEST);

      if (input.authType == UserShadowKeyType.WEBAUTHN) {
        if (!input.authChallengeId)
          throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

        if (!input.authKey)
          throw new AppException(KeyRingExceptionCode.NoSignature, "Missing the webauthn response", HttpStatus.BAD_REQUEST);
      } else if (input.authKey == UserShadowKeyType.PASSWORD) {
        if (!input.authKey)
          throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
      }

      const shadow = await this.getShadowKey(user.id, input.authKeyId);
      if (!shadow)
        throw new AppException(KeyRingExceptionCode.NoAuthenticationKey, "no authorization key", HttpStatus.FORBIDDEN);

      let key: string;
      if (input.authType == UserShadowKeyType.WEBAUTHN) {
        const result = await this.verifyWebAuthnAuthenticatoin(input.authKey, input.challengeId, shadow);
        if (!result.verified)
          throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify error", HttpStatus.FORBIDDEN);

        key = shadow.key;
      } else if (input.authType == UserShadowKeyType.PASSWORD) {
        if (!PasswordHash.verify(shadow.key, input.authKey))
          throw new AppException(KeyRingExceptionCode.InvalidPassword, "Wrong password", HttpStatus.FORBIDDEN);

        key = input.authKey;
      }

      secretKey = await this.getSecretKey(shadow, key);
    } else {
      if (input.authType || input.authKeyId || input.authKey || input.authChallengeId)
        throw new AppException(KeyRingExceptionCode.UnsupportedAuthenticationKey, "Invalid authentication key data", HttpStatus.BAD_REQUEST);

      // New secret key for the new key ring
      const secretBox = SecretBox.random();
      secretKey = secretBox._bytes();
    }

    if (!input.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing key id", HttpStatus.BAD_REQUEST);

    let credentialId: string = null;
    let counter = 0;
    let newKey: string = null;
    if (input.type == UserShadowKeyType.WEBAUTHN) {
      if (!input.key)
        throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing public key", HttpStatus.BAD_REQUEST);

      if (!input.challengeId)
        throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

      const result = await this.verifyWebAuthnRegistation(input.key, input.challengeId);
      if (!result.verified)
          throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify error", HttpStatus.FORBIDDEN);

      newKey = Buffer.from(result.registrationInfo.credentialPublicKey).toString("hex");
      credentialId = Buffer.from(result.registrationInfo.credentialID).toString("hex");
      counter = result.registrationInfo.counter;
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (input.challengeId)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password data", HttpStatus.BAD_REQUEST);

      if (!input.key)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);

      newKey = input.key;
    }

    return await this.addShadowKey(user.id, input.keyId, newKey, credentialId, counter, input.type, secretKey);
  }

  async removeKey(input: RemoveKeyInput, user: User): Promise<boolean> {
    const count = await this.prisma.userShadowKey.count({
      where: {
        userId: user.id
      }
    });

    if (count <= 2)
      throw new AppException(KeyRingExceptionCode.CanNotUnbindKey, "Can not remove the last 2 keys", HttpStatus.FORBIDDEN);

    await this.removeShadowKey(user.id, input.keyId);
    return true;
  }

  async getAllKeys(user: User): Promise<UserShadowKey[]> {
    const keys = await this.prisma.userShadowKey.findMany({
      where: {
        userId: user.id
      }
    });

    if (!keys)
      throw new AppException(KeyRingExceptionCode.KeyRingNotExists, "No keyring exists for user", HttpStatus.NOT_FOUND);

    // clear the secret key, should not touch it out of the keyring scope
    for (const key of keys)
      key.secretKey = ""

    return keys;
  }

  async getMasterKey(input: AuthKeyInput, user: User): Promise<Uint8Array> {
    if (!input.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing key id", HttpStatus.BAD_REQUEST);

    if (input.type == UserShadowKeyType.WEBAUTHN) {
      if (!input.challengeId)
        throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

      if (!input.key)
        throw new AppException(KeyRingExceptionCode.NoSignature, "Missing the webauthn response", HttpStatus.BAD_REQUEST);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!input.key)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
    }

    const shadow = await this.getShadowKey(user.id, input.keyId);
    if (!shadow)
      throw new AppException(KeyRingExceptionCode.NoAuthenticationKey, "no authorization key", HttpStatus.FORBIDDEN);

    let key: string;
    if (input.type == UserShadowKeyType.WEBAUTHN) {
      const result = await this.verifyWebAuthnAuthenticatoin(input.key, input.challengeId, shadow);
      if (!result.verified)
        throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify error", HttpStatus.FORBIDDEN);

      key = shadow.key;
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!PasswordHash.verify(shadow.key, input.key))
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Wrong password", HttpStatus.FORBIDDEN);

      key = input.key;
    }

    return await this.getSecretKey(shadow, key);
  }

  async verifyAuthKey(input: AuthKeyInput): Promise<string> {
    if (!input.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing key id", HttpStatus.BAD_REQUEST);

    if (input.type == UserShadowKeyType.WEBAUTHN) {
      if (!input.challengeId)
        throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

      if (!input.key)
        throw new AppException(KeyRingExceptionCode.NoSignature, "Missing the webauthn response", HttpStatus.BAD_REQUEST);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!input.key)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
    }

    const shadow = await this.prisma.userShadowKey.findFirst({
      where: {
        keyId: input.keyId
      }
    });

    if (!shadow)
      return null;

    if (input.type == UserShadowKeyType.WEBAUTHN) {
      const result = await this.verifyWebAuthnAuthenticatoin(input.key, input.challengeId, shadow);
      if (!result.verified)
        throw new AppException(KeyRingExceptionCode.WebAuthnVerifyError, "WebAuthn verify error", HttpStatus.FORBIDDEN);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!PasswordHash.verify(shadow.key, input.key))
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Wrong password", HttpStatus.FORBIDDEN);
    }

    return shadow.userId;
  }

  async generateChallenge(): Promise<ChallengeEntity> {
    const content = randombytes_buf(128, "hex");

    // remove the expired entries
    await this.prisma.challenge.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - KeyRingService.CHALLENGE_EXPIRATION)
        }
      }
    });

    const challenge = await this.prisma.challenge.create({
      data: {
        content: content
      }
    });

    return challenge
  }
}

