import { AppExceptionCode } from "./exception-codes";

/**
 * Our custom exception type for errors produced by this app, without strong link to nest
 * http exceptions.
 */
export class AppException extends Error {
  /**
   * @param appExceptionCode Our ad-hoc exception cod specific for this app (not a http code). See @AppExceptionCode
   * @param message Displayable error to users.
   * @param httpCode Related http error type, for better understanding of error types from clients without looking at the error payload.
   */
  constructor(public appExceptionCode: AppExceptionCode, public message: string, public httpCode: number) {
    super(message);
  }
}