import { crypto_pwhash, crypto_pwhash_str, crypto_pwhash_str_verify } from "libsodium-wrappers";
import { crypto_pwhash_SALTBYTES, crypto_pwhash_OPSLIMIT_INTERACTIVE, crypto_pwhash_MEMLIMIT_INTERACTIVE, crypto_pwhash_ALG_DEFAULT } from "libsodium-wrappers"

export class PasswordHash {
    public static hash(password: Uint8Array | string): string {
        return crypto_pwhash_str(password,
            crypto_pwhash_OPSLIMIT_INTERACTIVE,
            crypto_pwhash_MEMLIMIT_INTERACTIVE);
    }

    public static verify(pwhash: string, password: Uint8Array | string): boolean {
        return crypto_pwhash_str_verify(pwhash, password);
    }

    public static derive(keyLength: number, password: Uint8Array | string): Uint8Array {
        const salt = new Uint8Array(crypto_pwhash_SALTBYTES);
        return crypto_pwhash(keyLength, password, salt,
            crypto_pwhash_OPSLIMIT_INTERACTIVE, crypto_pwhash_MEMLIMIT_INTERACTIVE, crypto_pwhash_ALG_DEFAULT);
    }
}
