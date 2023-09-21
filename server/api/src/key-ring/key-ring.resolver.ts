import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User, ActivityType } from '@prisma/client/main';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { AuthKeyInput } from './dto/auth-key-input';
import { AuthChallengeEntity } from './entities/auth-challenge.entity';
import { ShadowKeyEntity } from './entities/shadow-key.entity';
import { KeyRingService } from './key-ring.service';
import { ActivityService } from "../activity/activity.service";

@Resolver()
export class KeyRingResolver {
  constructor(private readonly keyRingService: KeyRingService,
              @Inject(forwardRef(() => ActivityService)) private readonly activityService: ActivityService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlockMasterKey(@Args('authKey') authKey: AuthKeyInput, @CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    return this.keyRingService.unlockMasterKey(authKey, browser.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ShadowKeyEntity)
  async bindKey(@Args('newKey') newKey: AuthKeyInput, @CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    const result = await this.keyRingService.bindKey(newKey, browser.id, user);
    await this.activityService.createActivity(user.id, {type: ActivityType.BIND_BROWSER, browserId: browser.id, browserName: browser.name});
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [ShadowKeyEntity])
  async changePassword(@Args('newPassword') newPassword: string, @CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    const result = await this.keyRingService.changePassword(newPassword, browser.id, user);
    await this.activityService.createActivity(user.id, {type: ActivityType.PASSWORD_CHANGED});
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  removeKey(@Args('keyId') keyId: string, @CurrentUser() user: User) {
    return this.keyRingService.removeKey(keyId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ShadowKeyEntity], { name: 'userKeys' })
  getAllKeys(@CurrentUser() user: User) {
    return this.keyRingService.getAllKeys(user);
  }

  @Query(() => AuthChallengeEntity)
  generateChallenge() {
    return this.keyRingService.generateChallenge();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  checkMasterKeyLock(@CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    return this.keyRingService.checkMasterKeyLock(browser.id, user.id);
  }
}
