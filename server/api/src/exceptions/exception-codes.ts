export enum KeyringExceptionCode {
  DuplicateKey = 10001,
  Unspecific = 10099
}

export enum AuthExceptionCode {
  SomethingTodo = 10101,
  Unspecific = 10199
}

export enum KeyRingExceptionCode {
  DBInternalError = 10201,
  KeyRingNotExists = 10202,
  InvalidPrivateKey = 10203,
  InvalidPublicKey = 10204,
  KeyNotExists = 10205,
  NoAuthenticationKey = 10206,
  CanNotUnbindKey = 10207,
  NoSignature = 10208,
  InvalidSignature = 10209,
  NoChallenge = 10210,
  UnsupportedAuthenticationKey = 10211
}

export type AppExceptionCode = KeyringExceptionCode | AuthExceptionCode | KeyRingExceptionCode;