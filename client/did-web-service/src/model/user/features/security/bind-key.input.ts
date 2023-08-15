import { UserShadowKeyType } from "@model/security/user-shadow-key-type";

export type BindKeyInput = {
  key: string;
  type: UserShadowKeyType;
  authorizationKey?: string;
  authorizationType?: UserShadowKeyType;
}