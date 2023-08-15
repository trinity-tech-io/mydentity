export enum KeyringExceptionCode {
  DuplicateKey = 10001,
  Unspecified = 10099
}

export enum AuthExceptionCode {
  SomethingTodo = 10101,
  Unspecified = 10199
}

export enum ClientError {
  OtherApolloError = 10901, // Apollo client error except handled graphql errors
}

export type AppExceptionCode =
  KeyringExceptionCode |
  AuthExceptionCode |
  ClientError;