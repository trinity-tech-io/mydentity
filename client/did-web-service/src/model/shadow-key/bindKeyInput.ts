import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";

export type BindKeyInput = {
  type: ShadowKeyType;
  keyId: string; // id
  key: string; // password/response json string
  challengeId?: string;
  authType?: ShadowKeyType;
  authKeyId?: string;
  authKey?: string;
}
