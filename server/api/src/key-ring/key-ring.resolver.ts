import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { KeyRingService } from './key-ring.service';
import { ShadowKeyEntity } from './entities/shadow-key.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BindKeyInput } from './dto/bind-key-input';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { RemoveKeyInput } from './dto/remove-key-input';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetMasterKeyInput } from './dto/get-master-key-input';

@Resolver()
export class KeyRingResolver {
  constructor(private readonly keyRingService: KeyRingService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation()
  bindKey(@Args('bindKeyInput') bindKeyInput: BindKeyInput, @CurrentUser() user: User) {
    try {
      this.keyRingService.bindKey(bindKeyInput, user);
    } catch (e) {
      // TODO:
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation()
  removeKey(@Args('removeKeyInput') removeKeyInput: RemoveKeyInput, @CurrentUser() user: User) {
    this.keyRingService.removeKey(removeKeyInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ShadowKeyEntity], { name: 'userKeys' })
  getAllKeys(@CurrentUser() user: User) {
    return this.keyRingService.getAllKeys(user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Uint8Array, { name: 'secretKey' })
  getMasterKey(@Args('getMasterKeyInput') getMasterKeyInput: GetMasterKeyInput, @CurrentUser() user: User) {
    return this.keyRingService.getMasterKey(getMasterKeyInput, user);
  }
}
