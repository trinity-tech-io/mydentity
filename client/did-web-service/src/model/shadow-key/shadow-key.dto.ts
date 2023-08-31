import { BrowserDTO } from "@model/browser/browser.dto";
import { ShadowKeyType } from "./shadow-key-type";

export class ShadowKeyDTO {
  keyId: string;
  key: string;
  type: ShadowKeyType;
  createdAt: string;
  updatedAt: string;
  browser?: BrowserDTO;
}
