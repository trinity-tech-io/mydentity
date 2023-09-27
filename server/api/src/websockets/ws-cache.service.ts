import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

type UserCacheValue = {
  socketIds: string[];
}

const USER_CACHE_PREFIX = "user-";
const REDIS_WS_TTL = 1 * 24 * 60 * 60 * 1000; // Time in ms for redis cache expiration. For websockets we target 1 day as we want to preserve connection ids, it's not just a short term cache.

/**
 * This cache service controls Redis storage for all websocket related data structures, including:
 * - user id -> user infos (including socket ids)
 */
@Injectable()
export class WebSocketCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  public async appendSocketId(userId: string, socketId: string): Promise<void> {
    const key = this.getUserCacheKey(userId);
    const value: UserCacheValue = await this.getUserCacheValue(userId);

    if (!value.socketIds.includes(socketId))
      value.socketIds.push(socketId);

    await this.cacheManager.set(key, value, REDIS_WS_TTL);
  }

  public async removeSocketIds(userId: string, invalidSocketIds: string[]): Promise<void> {
    if (!invalidSocketIds || invalidSocketIds.length === 0)
      return;

    const key = this.getUserCacheKey(userId);
    const value: UserCacheValue = await this.getUserCacheValue(userId);

    for (const id of invalidSocketIds) {
      const index = value.socketIds.indexOf(id);
      if (index >= 0) {
        value.socketIds.splice(index, 1);
      }
    }

    await this.cacheManager.set(key, value, REDIS_WS_TTL);
  }

  public async getSocketIds(userId: string): Promise<string[]> {
    return (await this.getUserCacheValue(userId)).socketIds;
  }

  private async getUserCacheValue(userId: string): Promise<UserCacheValue> {
    return await this.cacheManager.get<UserCacheValue>(this.getUserCacheKey(userId)) || this.defaultUserCacheValue();
  }

  private defaultUserCacheValue(): UserCacheValue {
    return {
      socketIds: []
    }
  }

  private getUserCacheKey(userId: string): string {
    return `${USER_CACHE_PREFIX}${userId}`;
  }
}