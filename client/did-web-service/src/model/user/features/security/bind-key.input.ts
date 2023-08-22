import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";

export type BindKeyInput = {
  keyId: string;
  key: string;
  type: ShadowKeyType;
  authorizationKey?: string;
  authorizationType?: ShadowKeyType;
}