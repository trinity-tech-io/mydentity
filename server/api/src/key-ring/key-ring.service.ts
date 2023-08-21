import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User, UserShadowKey, UserShadowKeyType } from '@prisma/client';
import { PasswordHash } from 'src/crypto/passwordhash';
import { SecretBox } from 'src/crypto/secretbox';
import { KeyPair as SignatureKeyPair, Signature as Ed25519Signature } from 'src/crypto/ed25519';
import { PublicKey as EcdsaPublicKey } from 'src/crypto/ecdsa';
import { AppException } from 'src/exceptions/app-exception';
import { KeyRingExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { BindKeyInput } from './dto/bind-key-input';
import { AuthKeyInput } from './dto/auth-key-input';
import { RemoveKeyInput } from './dto/remove-key-input';
import { ready, randombytes_buf } from 'libsodium-wrappers-sumo';
import { ChallengeEntity } from './entities/challenge.entity';

@Injectable()
export class KeyRingService {
  private static UNKNOWN_USER_ID = "unknown-user-id";
  private static CHALLENGE_EXPIRATION = 5 * 60 * 1000;

  private serverKeyPair: SignatureKeyPair;

  public static async init(): Promise<void> {
    await ready;
    await Ed25519Signature.init();
    await SecretBox.init();
    await PasswordHash.init();
  }

  constructor(private prisma: PrismaService) {
    const sk = Buffer.from(`${process.env.KEY_RING_PRIVATEKEY}`, 'hex');

    try {
      this.serverKeyPair = SignatureKeyPair.fromPrivateKey(sk);
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.InvalidPrivateKey,
        "Invalid server private key from the env file: " + e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getPrisma(): PrismaService {
    return this.prisma;
  }

  private async verifySignature(sig: string, key: string, challengeId: string) {
    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: challengeId,
        createdAt: {
          gte: new Date(Date.now() - KeyRingService.CHALLENGE_EXPIRATION)
        }
      }
    });

    if (!challenge)
      throw new AppException(KeyRingExceptionCode.NoChallenge, "No challenge or expired", HttpStatus.BAD_REQUEST);

    let success = false;
    try {
      const binSig = Buffer.from(sig, "hex");
      const binChallenge = Buffer.from(challenge.content, "hex");
      const pk = new EcdsaPublicKey(Buffer.from(key, "hex"));
      success = pk.verify(binSig, binChallenge);
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Invalid public key: " + e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!success)
      throw new AppException(KeyRingExceptionCode.InvalidSignature, "Invalid signature", HttpStatus.FORBIDDEN);
  }

  private async addShadowKey(userId: string, keyId: string, key: string, type: UserShadowKeyType, secretKey: Uint8Array): Promise<void> {
    let authKey: string;
    let password: string | Uint8Array;

    if (type == UserShadowKeyType.PASSWORD) {
      // Create the password encrypted shadow key
      authKey = PasswordHash.hash(key);
      password = key;
    } else if (type == UserShadowKeyType.ED25519) {
      // Create the device passkey encrypted shadow key
      authKey = key;
      const k1 = Buffer.from(key, 'hex');
      const k2 = Buffer.from(this.serverKeyPair.privateKey()._bytes());
      password = Buffer.concat([k1, k2]);
    }

    const encryptedSecretKey = SecretBox.encryptWithPassword(secretKey, password);

    await this.prisma.userShadowKey.create({
      data: {
        userId: userId,
        keyId: keyId,
        key: authKey,
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
    } else if (shadow.type == UserShadowKeyType.ED25519) {
      const k1 = Buffer.from(key, 'hex');
      const k2 = Buffer.from(this.serverKeyPair.privateKey()._bytes());
      password = Buffer.concat([k1, k2]);
    }

    const encryptedSecretKey = Buffer.from(shadow.secretKey, 'hex');
    return SecretBox.decryptWithPassword(encryptedSecretKey, password);
  }

  async bindKey(input: BindKeyInput, user: User): Promise<boolean> {
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

      if (input.authType == UserShadowKeyType.ED25519) {
        if (!input.authChallengeId)
          throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

        if (!input.authSig)
          throw new AppException(KeyRingExceptionCode.NoSignature, "Missing signature", HttpStatus.BAD_REQUEST);
      } else if (input.authKey == UserShadowKeyType.PASSWORD) {
        if (!input.authKey)
          throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
      }

      const shadow = await this.getShadowKey(user.id, input.authKeyId);
      if (!shadow)
        throw new AppException(KeyRingExceptionCode.NoAuthenticationKey, "no authorization key", HttpStatus.FORBIDDEN);

      let key: string;
      if (input.authType == UserShadowKeyType.ED25519) {
        this.verifySignature(input.authSig, shadow.key, input.authChallengeId);
        key = shadow.key;
      } else if (input.authType == UserShadowKeyType.PASSWORD) {
        if (!PasswordHash.verify(shadow.key, input.authKey))
          throw new AppException(KeyRingExceptionCode.InvalidPassword, "Wrong password", HttpStatus.FORBIDDEN);

        key = input.authKey;
      }

      secretKey = await this.getSecretKey(shadow, key);
    } else {
      if (input.authType || input.authKeyId || input.authKey || input.authChallengeId || input.authSig)
        throw new AppException(KeyRingExceptionCode.UnsupportedAuthenticationKey, "Invalid authentication key data", HttpStatus.BAD_REQUEST);

      // New secret key for the new key ring
      const secretBox = SecretBox.random();
      secretKey = secretBox._bytes();
    }

    if (!input.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing key id", HttpStatus.BAD_REQUEST);

    if (input.type == UserShadowKeyType.ED25519) {
      if (!input.key)
        throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing public key", HttpStatus.BAD_REQUEST);

      if (!input.challengeId)
        throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

      if (!input.sig)
        throw new AppException(KeyRingExceptionCode.NoSignature, "Missing signature", HttpStatus.BAD_REQUEST);

      this.verifySignature(input.sig, input.key, input.challengeId);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (input.challengeId || input.sig)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password data", HttpStatus.BAD_REQUEST);

      if (!input.key)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
    }

    await this.addShadowKey(user.id, input.keyId, input.key, input.type, secretKey);
    return true;
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

    if (input.type == UserShadowKeyType.ED25519) {
      if (!input.challengeId)
        throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

      if (!input.sig)
        throw new AppException(KeyRingExceptionCode.NoSignature, "Missing signature", HttpStatus.BAD_REQUEST);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!input.password)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
    }

    const shadow = await this.getShadowKey(user.id, input.keyId);
    if (!shadow)
      throw new AppException(KeyRingExceptionCode.NoAuthenticationKey, "no authorization key", HttpStatus.FORBIDDEN);

    let key: string;
    if (input.type == UserShadowKeyType.ED25519) {
      this.verifySignature(input.sig, shadow.key, input.challengeId);
      key = shadow.key;
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!PasswordHash.verify(shadow.key, input.password))
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Wrong password", HttpStatus.FORBIDDEN);

      key = input.password;
    }

    return await this.getSecretKey(shadow, key);
  }

  async verifyAuthKey(input: AuthKeyInput): Promise<string> {
    if (!input.keyId)
      throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Missing key id", HttpStatus.BAD_REQUEST);

    if (input.type == UserShadowKeyType.ED25519) {
      if (!input.challengeId)
        throw new AppException(KeyRingExceptionCode.NoChallengeId, "Missing challenge id", HttpStatus.BAD_REQUEST);

      if (!input.sig)
        throw new AppException(KeyRingExceptionCode.NoSignature, "Missing signature", HttpStatus.BAD_REQUEST);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!input.password)
        throw new AppException(KeyRingExceptionCode.InvalidPassword, "Missing password", HttpStatus.BAD_REQUEST);
    }

    const shadow = await this.prisma.userShadowKey.findFirst({
      where: {
        keyId: input.keyId
      }
    });

    if (!shadow)
      return null;

    if (input.type == UserShadowKeyType.ED25519) {
      this.verifySignature(input.sig, shadow.key, input.challengeId);
    } else if (input.type == UserShadowKeyType.PASSWORD) {
      if (!PasswordHash.verify(shadow.key, input.password))
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

