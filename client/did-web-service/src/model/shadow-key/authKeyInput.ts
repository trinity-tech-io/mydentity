import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";

export type AuthKeyInput = {
  type: ShadowKeyType; // The key type
  keyId: string; // The key id to do the authorization
  key: string;
  challengeId?: string;
}