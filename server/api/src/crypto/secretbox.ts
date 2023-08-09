import { crypto_secretbox_KEYBYTES, crypto_secretbox_MACBYTES, crypto_secretbox_NONCEBYTES } from "libsodium-wrappers";
import { crypto_secretbox_keygen, crypto_secretbox_easy, crypto_secretbox_open_easy } from "libsodium-wrappers";
import { crypto_pwhash, crypto_pwhash_ALG_DEFAULT, crypto_pwhash_MEMLIMIT_INTERACTIVE, crypto_pwhash_OPSLIMIT_INTERACTIVE, crypto_pwhash_SALTBYTES } from "libsodium-wrappers";
import { increment, memzero, randombytes_buf, to_hex } from "libsodium-wrappers";

export class SecretBox {
    public static MAC_BYTES: number = crypto_secretbox_MACBYTES;
    public static KEY_BYTES: number = crypto_secretbox_KEYBYTES;
    private key: Uint8Array;

    public constructor(key: Uint8Array) {
        if (key.length != SecretBox.KEY_BYTES)
        throw new Error("Invalid key length");
    }

    public static random(): SecretBox {
        return new SecretBox(crypto_secretbox_keygen());
    }

    public encrypt(data: Uint8Array | string, nonce: SecretBox.Nonce): Uint8Array {
        return crypto_secretbox_easy(data, nonce._bytes(), this.key);
    }

    public decrypt(data: Uint8Array, nonce: SecretBox.Nonce): Uint8Array {
        return crypto_secretbox_open_easy(data, nonce._bytes(), this.key);
    }

    private static deriveKeyFromPassword(password: Uint8Array | string, nonce: Uint8Array): Uint8Array {
        let salt = new Uint8Array(nonce, 0, crypto_pwhash_SALTBYTES);

        return crypto_pwhash(SecretBox.KEY_BYTES, password, salt,
            crypto_pwhash_OPSLIMIT_INTERACTIVE, crypto_pwhash_MEMLIMIT_INTERACTIVE, crypto_pwhash_ALG_DEFAULT);
    }

    public static encryptWithPassword(data: Uint8Array | string, password: Uint8Array | string): Uint8Array {
        let nonce = randombytes_buf(SecretBox.Nonce.BYTES);
        let key = this.deriveKeyFromPassword(password, nonce);

        let cipher = crypto_secretbox_easy(data, nonce, key);

        let result = new Uint8Array(nonce.length + cipher.length);
        result.set(nonce, 0);
        result.set(cipher, nonce.length);
        return result;
    }

    public static decryptWithPassword(data: Uint8Array, password: Uint8Array | string): Uint8Array {
        let nonce = new Uint8Array(data, 0, SecretBox.Nonce.BYTES);
        let key = this.deriveKeyFromPassword(password, nonce);
        let cipher = new Uint8Array(data, SecretBox.Nonce.BYTES);

        return crypto_secretbox_open_easy(cipher, nonce, key);
    }

    public toString(): string {
        return to_hex(this.key);
    }

    public _bytes() {
        return this.key;
    }
}

export namespace SecretBox {
    export class Nonce {
        public static BYTES: number = crypto_secretbox_NONCEBYTES;
        private bytes: Uint8Array;

        public constructor(bytes: Uint8Array) {
            if (bytes.length != Nonce.BYTES)
                throw new Error("Invalid nonce length");

            this.bytes = bytes;
        }

        public static random(): Nonce {
            return new Nonce(randombytes_buf(Nonce.BYTES));
        }

        public static zero(): Nonce {
            let nonce = new Uint8Array(Nonce.BYTES)
            memzero(nonce);
            return new Nonce(nonce);
        }

        public increment(): Nonce {
            let nonce = new Uint8Array(this.bytes);
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
}
