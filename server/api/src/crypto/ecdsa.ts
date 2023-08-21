import { ec } from "elliptic";
import { InvalidArgumentException } from "./exceptions";
import * as createHash from "create-hash";

const compact = true;

export class Signature {
    public static BYTES = 64;
    private hash: createHash.HashAlgorithm;

    public constructor() {
        this.reset();
    }

    public reset(): void {
        this.hash = createHash("sha256");
    }

    public update(data: Uint8Array | string): void {
        this.hash.update(data);
    }

    public sign(sk: PrivateKey): Uint8Array {
        const digest = this.hash.digest();
        return sk.sign(digest);
    }

    public verify(sig: Uint8Array, pk: PublicKey): boolean {
        const digest = this.hash.digest();
        return pk.verify(sig, digest);
    }
}

export class PrivateKey {
    public static BYTES = 32;
    private key: ec.KeyPair;

    public constructor(key: Uint8Array) {
        if (key.length != PrivateKey.BYTES)
            throw new InvalidArgumentException("Invalid key length");

        const ecdsa = new ec("p256");
        this.key = ecdsa.keyFromPrivate(key)
    }

    public getPublicKey(): PublicKey {
        return new PublicKey(Buffer.from(this.key.getPublic(compact, "hex"), "hex"))
    }

    public toString(): string {
        return this.key.getPrivate("hex")
    }

    public sign(data: Uint8Array | string): Uint8Array {
        const digest = createHash("sha256").update(data).digest();
        const sig = this.key.sign(digest);
        return Buffer.from(sig.r.toString("hex", 64) + sig.s.toString("hex", 64), "hex");
    }

    public _bytes(): Uint8Array {
        return Buffer.from(this.key.getPrivate("hex"), "hex");
    }
}

export class PublicKey {
    public static BYTES = 33;
    private key: ec.KeyPair;

    public constructor(key: Uint8Array) {
        if (key.length != PublicKey.BYTES)
            throw new InvalidArgumentException("Invalid key length");

        const ecdsa = new ec("p256");
        this.key = ecdsa.keyFromPublic(key)
    }

    public toString(): string {
        return this.key.getPublic(compact, "hex")
    }

    public verify(sig: Uint8Array, data: Uint8Array | string): boolean {
        if (sig.length != Signature.BYTES)
            return false;

        const digest = createHash("sha256").update(data).digest();
        const si = { r: Buffer.from(sig.slice(0, 32)).toString("hex"), s: Buffer.from(sig.slice(32)).toString("hex") };
        return this.key.verify(digest, si)
    }

    public _bytes(): Uint8Array {
        return Buffer.from(this.key.getPublic(compact, "hex"), "hex");
    }
}

export class KeyPair {
    private sk: PrivateKey;
    private pk: PublicKey;

    private constructor(sk: PrivateKey, pk: PublicKey) {
        this.sk = sk
        this.pk = pk;
    }

    public static random(): KeyPair {
        const ecdsa = new ec('p256');
        const keypair = ecdsa.genKeyPair();
        const sk = new PrivateKey(Buffer.from(keypair.getPrivate("hex"), "hex"));
        const pk = new PublicKey(Buffer.from(keypair.getPublic(compact, "hex"), "hex"));
        return new KeyPair(sk, pk);
    }

    public static fromPrivateKey(key: Uint8Array | PrivateKey): KeyPair {
        if (key instanceof Uint8Array && key.length != PrivateKey.BYTES)
            throw new InvalidArgumentException("Invalid private key length");

        const sk = key instanceof Uint8Array ? new PrivateKey(key) : key;
        const pk = sk.getPublicKey();

        return new KeyPair(sk, pk);
    }

    public privateKey(): PrivateKey {
        return this.sk;
    }

    public publicKey(): PublicKey {
        return this.pk;
    }
}
