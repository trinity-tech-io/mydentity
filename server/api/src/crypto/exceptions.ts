
export class InvalidArgumentException extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class CryptoError extends Error {
    constructor(message?: string) {
        super(message);
    }
}