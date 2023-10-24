export enum AuthExceptionCode {
  AuthError = 10102,
  EmailAlreadyExists = 10103,
  InexistingEmail = 10104,
  InexistingAuthKey = 10105,
  WrongAccessToken = 10106,
  InexistingUser = 10107,
  IdentityNotOwned = 10108, // User doesn't own an identity we are trying to use
  CredenialNotOwned = 10109, // User doesn't own a credential we are trying to use
  IdentityRootNotOwned = 10110, // User doesn't own a root identity we are trying to use
  InvalidPINCode = 10111,
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
  NetworkError = 10310,
  DIDPublishError = 10311,
  DIDObjectAlreadyExist = 10312,
  DIDObjectNotExist = 10313,
  SyncError = 10314,
  RootIdentityAlreadyExists = 10315,
}

export enum DataExceptionCode {
  MissingContent = 10401, // Some expected data is missing or empty
  InvalidContent = 10402, // Some of the given content doesn't match the expected data format
}

export enum IdentityClaimExceptionCode {
  RequestNotExists = 10501,
  RequestExpired = 10502,
  InvalidNonce = 10503,
  AlreadyClaimed = 10504
}

export type AppExceptionCode = AuthExceptionCode | KeyRingExceptionCode | DIDExceptionCode | DataExceptionCode | IdentityClaimExceptionCode;