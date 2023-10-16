import { storageService } from "@services/storage.service";
import { UserFeature } from "../user-feature";
import { User } from "@model/user/user";

/**
 * File system storage sandboxed for this user, in order to not mix data with other users
 */
export class StorageFeature implements UserFeature {
  constructor(private user: User) { }

  public async set(key: string, value: string): Promise<void> {
    return storageService.set(this.getObjectContext(), key, value);
  }

  public async get(key: string, defaultValue: string | null): Promise<string> {
    return storageService.get(this.getObjectContext(), key, defaultValue);
  }

  private getObjectContext(): string {
    return `user_${this.user.id}`;
  }
}
