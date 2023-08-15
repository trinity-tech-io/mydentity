import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserShadowKey, UserShadowKeyType } from '@prisma/client';
import { SecretBox } from 'src/crypto/secretbox';
import { KeyPair as SignatureKeyPair, PublicKey as SignaturePublicKey } from 'src/crypto/signature';
import { PasswordHash } from 'src/crypto/passwordhash';
import { CryptoBox, KeyPair as CryptoBoxKeyPair, PublicKey as CryptoBoxPublicKey, Nonce as CryptoBoxNonce } from 'src/crypto/cryptobox';
import { BindKeyInput } from './dto/bind-key-input';
import { RemoveKeyInput } from './dto/remove-key-input';
import { GetMasterKeyInput } from './dto/get-master-key-input';

@Injectable()
export class KeyRingService {
  private serverKeyPair: SignatureKeyPair;
  private encryptionKeyPair: CryptoBoxKeyPair;

  constructor(private prisma: PrismaService) {
    const sk = Buffer.from(`${process.env.SERVER_PRIVATEKEY}`, 'hex');
    this.serverKeyPair = SignatureKeyPair.fromPrivateKey(sk);
    this.encryptionKeyPair = CryptoBoxKeyPair.fromSignatureKeyPair(this.serverKeyPair);
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
      const devicePk = CryptoBoxPublicKey.fromSignatureKey(Buffer.from(key, 'hex'));
      const nonce = new CryptoBoxNonce(PasswordHash.derive(CryptoBoxNonce.BYTES, devicePk._bytes()));
      encryptedSecretKey = CryptoBox.encryptEasy(secretKey, nonce, devicePk, this.encryptionKeyPair.privateKey());
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
    await this.prisma.userShadowKey.delete({
      where: {
        userId_key: {
          userId: userId,
          key: authKey,
        }
      }
    })
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
      throw new Error("Invalid authentication key");

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
        throw new Error("No authorization key to bind new key");

      secretKey = await this._getMasterKey(user.id, input.authorizationKey, input.authorizationType);
    } else {
      if (input.authorizationKey)
        throw new Error("No keyring for user");

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
      throw new Error("Can not unbind the last two keys");

    await this._removeShadowKey(user.id, input.key, input.type);
  }

  async getAllKeys(user: User): Promise<UserShadowKey[]> {
    const keys = await this.prisma.userShadowKey.findMany({
      where: {
        userId: user.id
      }
    });

    // clear the secret key, should not touch it out of the keyring scope
    for (const key of keys)
      key.secretKey = ""

    return keys;
  }

  async getMasterKey(input: GetMasterKeyInput, user: User): Promise<Uint8Array> {
    return await this._getMasterKey(user.id, input.key, input.type);
  }
}

