import { crypto_sign_BYTES, crypto_sign_SECRETKEYBYTES, crypto_sign_PUBLICKEYBYTES, crypto_sign_SEEDBYTES } from "libsodium-wrappers";
import { KeyType, StateAddress } from "libsodium-wrappers";
import { crypto_sign_keypair, crypto_sign_seed_keypair, crypto_sign_detached, crypto_sign_verify_detached, crypto_sign_init, crypto_sign_update, crypto_sign_final_create, crypto_sign_final_verify } from "libsodium-wrappers";
import { to_hex } from "libsodium-wrappers";

export class Signature {
    public static BYTES: number = crypto_sign_BYTES;
    private state: StateAddress;

    public constructor() {
        this.reset();
    }

    public reset(): void {
        this.state = crypto_sign_init();
    }

    public update(data: Uint8Array | string): void {
        crypto_sign_update(this.state, data);
    }

    public sign(sk: PrivateKey): Uint8Array {
        return crypto_sign_final_create(this.state, sk._bytes());
    }

    public verify(sig: Uint8Array, pk: PublicKey): boolean {
        return crypto_sign_final_verify(this.state, sig, pk._bytes());
    }
}

export class PrivateKey {
    public static BYTES: number = crypto_sign_SECRETKEYBYTES;
    private key: Uint8Array;

    public constructor(key: Uint8Array) {
        if (key.length != PrivateKey.BYTES)
            throw new Error("Invalid key length");

        this.key = key;
    }

    public getPublicKey(): PublicKey {
        return new PublicKey(new Uint8Array(this.key, KeyPair.SEED_BYTES, PublicKey.BYTES))
    }

    public toString(): string {
        return to_hex(this.key);
    }

    public sign(data: Uint8Array | string): Uint8Array {
        return crypto_sign_detached(data, this.key);
    }

    public _bytes(): Uint8Array {
        return this.key;
    }
}

export class PublicKey {
    public static BYTES: number = crypto_sign_PUBLICKEYBYTES;
    private key: Uint8Array;

    public constructor(key: Uint8Array) {
        if (key.length != PublicKey.BYTES)
            throw new Error("Invalid key length");

        this.key = key;
    }

    public toString(): string {
        return to_hex(this.key);
    }

    public verify(sig: Uint8Array, data: Uint8Array | string): boolean {
        return crypto_sign_verify_detached(sig, data, this.key);
    }

    public _bytes(): Uint8Array {
        return this.key;
    }
}

export class KeyPair {
    public static SEED_BYTES: number = crypto_sign_SEEDBYTES;

    private keyType: KeyType;
    private sk: PrivateKey;
    private pk: PublicKey;

    private constructor(keyType: KeyType, sk: PrivateKey, pk: PublicKey) {
        this.keyType = keyType;
        this.sk = sk;
        this.pk = pk;
    }

    public static random(): KeyPair {
        const kp = crypto_sign_keypair();
        return new KeyPair(kp.keyType, new PrivateKey(kp.privateKey), new PublicKey(kp.publicKey));
    }

    public static fromSeed(seed: Uint8Array): KeyPair {
        if (seed.length != KeyPair.SEED_BYTES)
            throw new Error("Invalid seed length");

        const kp = crypto_sign_seed_keypair(seed);
        return new KeyPair(kp.keyType, new PrivateKey(kp.privateKey), new PublicKey(kp.publicKey));
    }

    public static fromPrivateKey(key: Uint8Array | PrivateKey): KeyPair {
        const sk = key instanceof Uint8Array ? new PrivateKey(key) : key;
        const pk = sk.getPublicKey();

        return new KeyPair('ed25519', sk, pk);
    }

    public privateKey(): PrivateKey {
        return this.sk;
    }

    public publicKey(): PublicKey {
        return this.pk;
    }
}
