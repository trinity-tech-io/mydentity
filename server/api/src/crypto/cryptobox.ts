import { crypto_box_PUBLICKEYBYTES, crypto_box_SECRETKEYBYTES, crypto_box_SEEDBYTES, crypto_box_MACBYTES, crypto_box_NONCEBYTES } from "libsodium-wrappers";
import { KeyType } from "libsodium-wrappers";
import { crypto_box_keypair, crypto_box_seed_keypair, crypto_scalarmult_base, crypto_sign_ed25519_pk_to_curve25519, crypto_sign_ed25519_sk_to_curve25519 } from "libsodium-wrappers";
import { crypto_box_beforenm, crypto_box_easy_afternm, crypto_box_open_easy_afternm, crypto_box_easy, crypto_box_open_easy, crypto_box_seal, crypto_box_seal_open } from "libsodium-wrappers";
import { increment, memzero, randombytes_buf, to_hex } from "libsodium-wrappers";
import { PrivateKey as SignPrivateKey, PublicKey as SignPublicKey, KeyPair as SignKeyPair } from "./signature"
import { InvalidArgumentException } from "./exceptions";

export class CryptoBox {
    public static MAC_BYTES: number = crypto_box_MACBYTES;
    public key: Uint8Array;

    public constructor(pk: PublicKey, sk: PrivateKey) {
        this.key = crypto_box_beforenm(pk._bytes(), sk._bytes());
    }

    public encrypt(data: Uint8Array | string, nonce: Nonce): Uint8Array {
        return crypto_box_easy_afternm(data, nonce._bytes(), this.key);
    }

    public decrypt(data: Uint8Array, nonce: Nonce): Uint8Array {
        return crypto_box_open_easy_afternm(data, nonce._bytes(), this.key);
    }

    public static encryptEasy(data: Uint8Array | string, nonce: Nonce, pk: PublicKey, sk: PrivateKey): Uint8Array {
        return crypto_box_easy(data, nonce._bytes(), pk._bytes(), sk._bytes());
    }

    public static decryptEasy(data: Uint8Array | string, nonce: Nonce, pk: PublicKey, sk: PrivateKey): Uint8Array {
        return crypto_box_open_easy(data, nonce._bytes(), pk._bytes(), sk._bytes());
    }

    public static encryptSealed(data: Uint8Array | string, pk: PublicKey): Uint8Array {
        return crypto_box_seal(data, pk._bytes());
    }

    public static decryptSealed(data: Uint8Array,  pk: PublicKey, sk: PrivateKey): Uint8Array {
        return crypto_box_seal_open(data, pk._bytes(), sk._bytes());
    }
}

export class PrivateKey {
    public static BYTES: number = crypto_box_SECRETKEYBYTES;
    private key: Uint8Array;

    public constructor(key: Uint8Array) {
        if (key.length != PrivateKey.BYTES)
            throw new InvalidArgumentException("Invalid key length");

        this.key = key;
    }

    public static fromSignatureKey(key: Uint8Array | SignPrivateKey): PrivateKey {
        if (key instanceof Uint8Array && key.length != SignPrivateKey.BYTES)
            throw new InvalidArgumentException("Invalid key length")

        const sk = crypto_sign_ed25519_sk_to_curve25519(key instanceof Uint8Array ? key : key._bytes());
        return new PrivateKey(sk);
    }

    public getPublicKey(): PublicKey {
        const pk = crypto_scalarmult_base(this.key);
        return new PublicKey(pk)
    }

    public toString(): string {
        return to_hex(this.key);
    }

    public _bytes(): Uint8Array {
        return this.key;
    }
}

export class PublicKey {
    public static BYTES: number = crypto_box_PUBLICKEYBYTES;
    private key: Uint8Array;

    public constructor(key: Uint8Array) {
        if (key.length != PublicKey.BYTES)
            throw new InvalidArgumentException("Invalid key length");

        this.key = key;
    }

    public static fromSignatureKey(key: Uint8Array | SignPublicKey): PublicKey {
        if (key instanceof Uint8Array && key.length != SignPublicKey.BYTES)
            throw new InvalidArgumentException("Invalid key length")

        const pk = crypto_sign_ed25519_pk_to_curve25519(key instanceof Uint8Array ? key : key._bytes());
        return new PublicKey(pk);
    }

    public toString(): string {
        return to_hex(this.key);
    }

    public _bytes(): Uint8Array {
        return this.key;
    }
}

export class KeyPair {
    public static SEED_BYTES: number = crypto_box_SEEDBYTES;

    private keyType: KeyType;
    private sk: PrivateKey;
    private pk: PublicKey;

    private constructor(keyType: KeyType, sk: PrivateKey, pk: PublicKey) {
        this.keyType = keyType;
        this.sk = sk;
        this.pk = pk;
    }

    public static random(): KeyPair {
        const kp = crypto_box_keypair();
        return new KeyPair(kp.keyType, new PrivateKey(kp.privateKey), new PublicKey(kp.publicKey));
    }

    public static fromSeed(seed: Uint8Array): KeyPair {
        if (seed.length != KeyPair.SEED_BYTES)
            throw new InvalidArgumentException("Invalid seed length");

        const kp = crypto_box_seed_keypair(seed);
        return new KeyPair(kp.keyType, new PrivateKey(kp.privateKey), new PublicKey(kp.publicKey));
    }

    public static fromPrivateKey(key: Uint8Array | PrivateKey): KeyPair {
        const sk = key instanceof Uint8Array ? new PrivateKey(key) : key;
        const pk = sk.getPublicKey();

        return new KeyPair('curve25519', sk, pk);
    }

    public static fromSignatureKeyPair(keypair: SignKeyPair): KeyPair {
        const sk = PrivateKey.fromSignatureKey(keypair.privateKey());
        const pk = sk.getPublicKey();

        return new KeyPair('curve25519', sk, pk);
    }

    public privateKey(): PrivateKey {
        return this.sk;
    }

    public publicKey(): PublicKey {
        return this.pk;
    }
}

export class Nonce {
    public static BYTES: number = crypto_box_NONCEBYTES;
    private bytes: Uint8Array;

    public constructor(bytes: Uint8Array) {
        if (bytes.length != Nonce.BYTES)
            throw new InvalidArgumentException("Invalid nonce length");

        this.bytes = bytes;
    }

    public static random(): Nonce {
        return new Nonce(randombytes_buf(Nonce.BYTES));
    }

    public static zero(): Nonce {
        const nonce = new Uint8Array(Nonce.BYTES)
        memzero(nonce);
        return new Nonce(nonce);
    }

    public increment(): Nonce {
        const nonce = new Uint8Array(this.bytes);
        increment(nonce);
        return new Nonce(nonce);
    }

    public toString(): string {
        return to_hex(this.bytes);
    }

    public _bytes(): Uint8Array {
        return this.bytes;
    }
}
