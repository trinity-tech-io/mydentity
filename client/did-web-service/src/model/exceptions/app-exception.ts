import { AppExceptionCode } from "./exception-codes";

/**
 * Custom exception from our backend, with additional information.
 */
export class AppException {
  public source: string;
  public appExceptionCode: AppExceptionCode;
  public statusCode: number; // http code
  public timestamp: Date;
  public message: string; // Message displayable to end user

  public static fromJson(payload: any): AppException {
    if (!AppException.isCustomException(payload))
      return null;

    const e = new AppException();
    Object.assign(e, payload);
    e.timestamp = new Date(payload.timestamp);

    return e;
  }

  public static isCustomException(error: any): boolean {
    if (typeof error === "object")
      return "source" in error && error["source"] === "api";

    return false;
  }

  public static newClientError(code: AppExceptionCode, message: string): AppException {
    const e = new AppException();
    e.message = message;
    e.appExceptionCode = code;
    e.statusCode = -1;
    e.timestamp = new Date();
    e.source = "client";
    return e;
  }
}
