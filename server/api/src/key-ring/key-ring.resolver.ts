import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { AuthKeyInput } from './dto/auth-key-input';
import { AuthChallengeEntity } from './entities/auth-challenge.entity';
import { ShadowKeyEntity } from './entities/shadow-key.entity';
import { KeyRingService } from './key-ring.service';

@Resolver()
export class KeyRingResolver {
  constructor(private readonly keyRingService: KeyRingService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlockMasterKey(@Args('authKey') authKey: AuthKeyInput, @CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    return this.keyRingService.unlockMasterKey(authKey, browser.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ShadowKeyEntity)
  bindKey(@Args('newKey') newKey: AuthKeyInput, @CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    return this.keyRingService.bindKey(newKey, browser.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [ShadowKeyEntity])
  changePassword(@Args('newPassword') newPassword: string, @CurrentBrowser() browser: Browser, @CurrentUser() user: User) {
    return this.keyRingService.changePassword(newPassword, browser.id, user);
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
