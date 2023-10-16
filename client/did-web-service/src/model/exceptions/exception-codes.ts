export enum AuthExceptionCode {
  SomethingTodo = 10101,
  AuthError = 10102,
  EmailAlreadyExists = 10103,
  EmailNotExists = 10104,
  AuthKeyNotExists = 10105,
  Unspecific = 10199,
}

export enum KeyRingExceptionCode {
  DatabaseError = 10201,          // Database access error
  InvalidKeyRingConfig = 10202,   // Wrong key-ring config entries in the .evn file
  KeyRingNotExists = 10203,       // User's key-ring not exist
  KeyNotExists = 10204,           // The auth key not exist
  InvalidChallengeId = 10205,     // The challenge id not exist or expired
  InvalidAuthKey = 10206,         // The auth key(input) is invalid. e.g. missing or invalid fields
  CanNotRemoveKey = 10207,        // Can not remote the key
  WebAuthnVerifyError = 20208,    // WebAuthn verify error
  WrongPassword = 10209,          // Wrong password
  Unauthorized = 10210            // Unauthorized(master key not unlocked), needs to do auth
}

export enum DIDExceptionCode {
  DIDStorageError = 10301,
  MnemonicError = 10302,
  DIDAlreadyExists = 10303,
  DIDDoesNotExist = 10304,
  CredentialAlreadyExists = 10305,
  CredentialNotExists = 10306,
  InvalidCredential = 10307,
  DIDNotUpToDateError = 10308,
  DIDTransactionError = 10309,
  NetworkError = 10310
}

export enum IdentityClaimExceptionCode {
  RequestNotExists = 10501,
  RequestExpired = 10502,
  InvalidNonce = 10503,
  AlreadyClaimed = 10504
}

export enum ClientError {
  OtherApolloError = 10901, // Apollo client error except handled graphql errors
  OtherAxiosError = 10902,
  UnlockKeyCancelled = 10903, // The unlock master key prompt operation has been cancelled by the user
  InvalidParameter = 10904,
}

export type AppExceptionCode = AuthExceptionCode | KeyRingExceptionCode | DIDExceptionCode | IdentityClaimExceptionCode | ClientError;