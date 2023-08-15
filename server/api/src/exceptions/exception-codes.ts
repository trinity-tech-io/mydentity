export enum KeyringExceptionCode {
  DuplicateKey = 10001,
  Unspecific = 10099
}

export enum AuthExceptionCode {
  SomethingTodo = 10101,
  Unspecific = 10199
}

export type AppExceptionCode = KeyringExceptionCode | AuthExceptionCode;