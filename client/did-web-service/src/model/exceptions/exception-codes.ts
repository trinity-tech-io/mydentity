export enum AuthExceptionCode {
  SomethingTodo = 10101,
  AuthError = 10102,
  EmailAlreadyExists = 10103,
  EmailNotExists = 10104,
  AuthKeyNotExists = 10105,
  Unspecific = 10199,
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
  UnsupportedAuthenticationKey = 10211,
  InvalidPassword = 10212,
  NoChallengeId = 20213
}

export enum ClientError {
  OtherApolloError = 10901, // Apollo client error except handled graphql errors
  OtherAxiosError = 10902,
}

export type AppExceptionCode = KeyRingExceptionCode | AuthExceptionCode | KeyRingExceptionCode | ClientError;