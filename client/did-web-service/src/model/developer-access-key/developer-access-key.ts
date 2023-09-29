import { DeveloperAccessKeyDTO } from "./developer-access-key.dto";

export class DeveloperAccessKey {
  id: string;
  createdAt: Date;
  title?: string;

  public static async fromJson(json: DeveloperAccessKeyDTO): Promise<DeveloperAccessKey> {
    const accessKey: DeveloperAccessKey = Object.assign(new DeveloperAccessKey(), json);
    accessKey.createdAt = new Date(json.createdAt);
    return accessKey;
  }
}