import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowserID } from 'src/browsers/browser-id-user.decorator';
import { AuthKeyInput } from './dto/auth-key-input';
import { ChallengeEntity } from './entities/challenge.entity';
import { ShadowKeyEntity } from './entities/shadow-key.entity';
import { KeyRingService } from './key-ring.service';

@Resolver()
export class KeyRingResolver {
  constructor(private readonly keyRingService: KeyRingService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlockMasterKey(@Args('authKey') authKey: AuthKeyInput, @CurrentBrowserID() clientId: string, @CurrentUser() user: User) {
    return this.keyRingService.unlockMasterKey(authKey, clientId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ShadowKeyEntity)
  bindKey(@Args('newKey') newKey: AuthKeyInput, @CurrentBrowserID() clientId: string, @CurrentUser() user: User) {
    return this.keyRingService.bindKey(newKey, clientId, user);
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

  @Query(() => ChallengeEntity)
  generateChallenge() {
    return this.keyRingService.generateChallenge();
  }
}
