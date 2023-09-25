import { ExceptionCode } from "./exception-codes";

/**
 * Custom exception from this SDK with additional information
 */
export class SDKException {
  public code: ExceptionCode;
  public timestamp: Date;
  public message: string; // Message displayable to end user
  public errors: any; // Sub-errors that generated this exception

  private constructor() { }

  public static create(code: ExceptionCode, message: string, errors?: any): SDKException {
    const e = new SDKException();
    e.message = message;
    e.code = code;
    e.timestamp = new Date();
    e.errors = errors;
    return e;
  }

  public static isSDKException(error: any): boolean {
    return typeof error === "object" && "code" in error;
  }
}
