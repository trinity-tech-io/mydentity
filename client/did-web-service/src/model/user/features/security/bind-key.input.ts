import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { UnlockAuthorization } from "./unlock-authorization";

export type BindKeyInput = {
  keyId: string;
  key: string;
  type: ShadowKeyType;

  challengeId?: string;
  sig?: string;
} & Partial<UnlockAuthorization>;