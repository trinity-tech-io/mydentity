import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentClientID } from 'src/auth/currentclientid.decorator';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateIdentityInput } from './dto/create-identity.input';
import { IdentityEntity } from './entities/identity.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { IdentityService } from './identity.service';

@Resolver(() => IdentityEntity)
export class IdentityResolver {
  constructor(private readonly didService: IdentityService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  createIdentity(@Args('input') createIdentityInput: CreateIdentityInput, @CurrentUser() user: User) {
    return this.didService.create(createIdentityInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deleteIdentity(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    return this.didService.deleteIdentity(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TransactionEntity)
  createDIDPublishTransaction(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    return this.didService.createDIDPublishTransaction(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityEntity], { name: 'identities' })
  findAll(@CurrentUser() user: User, @CurrentClientID() clientId: string) {
    return this.didService.findAll(user);
  }
}
