import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { CurrentClientID } from 'src/auth/currentclientid.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BindKeyInput } from './dto/bind-key-input';
import { GetMasterKeyInput } from './dto/get-master-key-input';
import { RemoveKeyInput } from './dto/remove-key-input';
import { ShadowKeyEntity } from './entities/shadow-key.entity';
import { KeyRingService } from './key-ring.service';

@Resolver()
export class KeyRingResolver {
  constructor(private readonly keyRingService: KeyRingService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  bindKey(@Args('input') input: BindKeyInput, @CurrentUser() user: User, @CurrentClientID() clientId: string) {
    return this.keyRingService.bindKey(input, user, clientId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  removeKey(@Args('input') input: RemoveKeyInput, @CurrentUser() user: User) {
    return this.keyRingService.removeKey(input, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ShadowKeyEntity], { name: 'userKeys' })
  getAllKeys(@CurrentUser() user: User) {
    return this.keyRingService.getAllKeys(user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => String, { name: 'challenge' })
  generateChallenge(@CurrentUser() user: User, @CurrentClientID() clientId: string) {
    return this.keyRingService.generateChallenge(user, clientId);
  }
}
