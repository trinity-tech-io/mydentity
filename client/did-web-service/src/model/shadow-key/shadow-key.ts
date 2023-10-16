import { Browser } from "@model/browser/browser";
import { ShadowKeyType } from "./shadow-key-type";
import { shadowKeyCache } from "./shadow-key.cache";
import { ShadowKeyDTO } from "./shadow-key.dto";

export class ShadowKey {
  keyId: string;
  key: string;
  type: ShadowKeyType;
  createdAt: Date;
  updatedAt: Date;
  browser: Browser;

  public static async fromJson(json: ShadowKeyDTO): Promise<ShadowKey> {
    return shadowKeyCache.get(json.keyId, {
      async create() {
        return new ShadowKey();
      },
      async update(shadowKey: ShadowKey) {
        Object.assign(shadowKey, json);

        shadowKey.createdAt = new Date(json.createdAt);
        shadowKey.updatedAt = new Date(json.updatedAt);

        if (json.browser)
          shadowKey.browser = await Browser.fromJson(json.browser);
      },
    });
  }

  public equals(otherKey: ShadowKey): boolean {
    return this.keyId === otherKey.keyId;
  }
}