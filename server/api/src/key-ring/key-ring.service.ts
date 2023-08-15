import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User, UserShadowKey, UserShadowKeyType } from '@prisma/client';
import { CryptoBox, KeyPair as CryptoBoxKeyPair, Nonce as CryptoBoxNonce, PublicKey as CryptoBoxPublicKey } from 'src/crypto/cryptobox';
import { PasswordHash } from 'src/crypto/passwordhash';
import { SecretBox } from 'src/crypto/secretbox';
import { KeyPair as SignatureKeyPair } from 'src/crypto/signature';
import { AppException } from 'src/exceptions/app-exception';
import { KeyRingExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { BindKeyInput } from './dto/bind-key-input';
import { GetMasterKeyInput } from './dto/get-master-key-input';
import { RemoveKeyInput } from './dto/remove-key-input';

@Injectable()
export class KeyRingService {
  private serverKeyPair: SignatureKeyPair;
  private encryptionKeyPair: CryptoBoxKeyPair;

  constructor(private prisma: PrismaService) {
    const sk = Buffer.from(`${process.env.SERVER_PRIVATEKEY}`, 'hex');
    try {
      this.serverKeyPair = SignatureKeyPair.fromPrivateKey(sk);
      this.encryptionKeyPair = CryptoBoxKeyPair.fromSignatureKeyPair(this.serverKeyPair);
    } catch (e) {
      throw new AppException(KeyRingExceptionCode.InvalidPrivateKey,
        "Invalid server private key from the env file: " + e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async _addShadowKey(userId: string, key: string, type: UserShadowKeyType, secretKey: Uint8Array): Promise<void> {
    let authKey: string;
    let encryptedSecretKey: Uint8Array;

    if (type == UserShadowKeyType.PASSWORD) {
      // Create the password encrypted shadow key
      authKey = PasswordHash.hash(key);
      encryptedSecretKey = SecretBox.encryptWithPassword(secretKey, key);
    } else if (type == UserShadowKeyType.ED25519) {
      // Create the device passkey encrypted shadow key
      authKey = key;
      try {
        const devicePk = CryptoBoxPublicKey.fromSignatureKey(Buffer.from(key, 'hex'));
        const nonce = new CryptoBoxNonce(PasswordHash.derive(CryptoBoxNonce.BYTES, devicePk._bytes()));
        encryptedSecretKey = CryptoBox.encryptEasy(secretKey, nonce, devicePk, this.encryptionKeyPair.privateKey());
      } catch (e) {
        throw new AppException(KeyRingExceptionCode.InvalidPublicKey, "Invalid public key: " + e, HttpStatus.BAD_REQUEST);
      }
    }

    await this.prisma.userShadowKey.create({
      data: {
        userId: userId,
        key: authKey,
        type: type,
        secretKey: Buffer.from(encryptedSecretKey).toString('hex')
      }
    });
  }

  private async _removeShadowKey(userId: string, key: string, type: UserShadowKeyType): Promise<void> {
    const authKey = type == UserShadowKeyType.PASSWORD ? PasswordHash.hash(key) : key;

    try {
      await this.prisma.userShadowKey.delete({
        where: {
          userId_key: {
            userId: userId,
            key: authKey,
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

  private async _getMasterKey(userId: string, key: string, type: UserShadowKeyType): Promise<Uint8Array> {
    const authKey = type == UserShadowKeyType.PASSWORD ? PasswordHash.hash(key) : key;
    const shadow = await this.prisma.userShadowKey.findFirst({
      where: {
        userId: userId,
        type: type,
        key: authKey
      }
    })

    if (!shadow)
      throw new AppException(KeyRingExceptionCode.KeyNotExists, "Key not exists", HttpStatus.NOT_FOUND);

    let secretKey: Uint8Array;
    const encryptedSecretKey = Buffer.from(shadow.secretKey, 'hex');
    if (type == UserShadowKeyType.PASSWORD) {
      secretKey = SecretBox.decryptWithPassword(encryptedSecretKey, key);
    } else if (type == UserShadowKeyType.ED25519) {
      const devicePk = CryptoBoxPublicKey.fromSignatureKey(Buffer.from(key, 'hex'));
      const nonce = new CryptoBoxNonce(PasswordHash.derive(CryptoBoxNonce.BYTES, devicePk._bytes()));
      secretKey = CryptoBox.decryptEasy(encryptedSecretKey, nonce, devicePk, this.encryptionKeyPair.privateKey());
    }

    return secretKey;
  }

  async bindKey(input: BindKeyInput, user: User): Promise<void> {
    const key = await this.prisma.userShadowKey.findFirst({
      where: {
        userId: user.id
      }
    })

    let secretKey: Uint8Array;
    if (key) {
      if (!input.authorizationKey)
        throw new AppException(KeyRingExceptionCode.NoAuthenticationKey, "No authentication key to bind new key", HttpStatus.FORBIDDEN);

      secretKey = await this._getMasterKey(user.id, input.authorizationKey, input.authorizationType);
    } else {
      if (input.authorizationKey)
        throw new AppException(KeyRingExceptionCode.KeyRingNotExists, "No keyring exists for user", HttpStatus.NOT_FOUND);

      // New secret key for the new key ring
      const secretBox = SecretBox.random();
      secretKey = secretBox._bytes();
    }

    await this._addShadowKey(user.id, input.key, input.type, secretKey);
  }

  async removeKey(input: RemoveKeyInput, user: User): Promise<void> {
    const count = await this.prisma.userShadowKey.count({
      where: {
        userId: user.id
      }
    });

    if (count <= 2)
      throw new AppException(KeyRingExceptionCode.CanNotUnbindKey, "Can not remove the last 2 keys", HttpStatus.FORBIDDEN);

    await this._removeShadowKey(user.id, input.key, input.type);
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

  async getMasterKey(input: GetMasterKeyInput, user: User): Promise<Uint8Array> {
    return await this._getMasterKey(user.id, input.key, input.type);
  }
}

