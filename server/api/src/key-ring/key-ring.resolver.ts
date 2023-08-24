import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentClientID } from 'src/auth/currentclientid.decorator';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthKeyInput } from './dto/auth-key-input';
import { ChallengeEntity } from './entities/challenge.entity';
import { ShadowKeyEntity } from './entities/shadow-key.entity';
import { KeyRingService } from './key-ring.service';

@Resolver()
export class KeyRingResolver {
  constructor(private readonly keyRingService: KeyRingService) { }

  @UseGuards(OptionalJwtAuthGuard)
  @Mutation(() => String)
  auth(@Args('authKey') authKey: AuthKeyInput, @CurrentClientID() clientId: string, @CurrentUser() user: User | null) {
    return this.keyRingService.auth(authKey, clientId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ShadowKeyEntity)
  bindKey(@Args('newKey') newKey: AuthKeyInput, @CurrentClientID() clientId: string, @CurrentUser() user: User) {
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
