import { AuthKeyInput } from "@services/keyring/auth-key.input";

/**
 * This type is related to the bind key input. This is a transport object for the UI
 * to be able to pass an unlock content (password or passkey info) to APIs that require
 * to unlock the master key.
 */
// TODO: remove this duplicate type, use AuthKeyInput
export type UnlockAuthorization = AuthKeyInput; /* {
  authKey?: string;
  authKeyId?: string;
  authType?: ShadowKeyType;

  // Only for passkey
  authChallengeId?: string;
  authSig?: string;
} */