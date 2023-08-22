import { ShadowKeyType } from "./shadow-key-type";
import { ShadowKeyDTO } from "./shadow-key.dto";

export class ShadowKey {
  id: string;
  key: string;
  type: ShadowKeyType;
  createdAt: Date;
  updatedAt: Date;

  public static async fromJson(json: ShadowKeyDTO): Promise<ShadowKey> {
    const shadowKey = new ShadowKey();
    Object.assign(shadowKey, json);

    shadowKey.createdAt = new Date(json.createdAt);
    shadowKey.updatedAt = new Date(json.updatedAt);

    return shadowKey;
  }

  public equals(otherKey: ShadowKey): boolean {
    return this.id === otherKey.id;
  }
}