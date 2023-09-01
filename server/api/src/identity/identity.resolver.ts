import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateIdentityInput } from './dto/create-identity.input';
import { PublicationStatusInput } from './dto/publication-status.input';
import { PublishIdentityInput } from './dto/publish-identity.input';
import { DIDPublishEntity } from './entities/didpublish.entity';
import { IdentityEntity } from './entities/identity.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { IdentityService } from './identity.service';

@Resolver(() => IdentityEntity)
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  createIdentity(@Args('input') createIdentityInput: CreateIdentityInput, @CurrentUser() user: User) {
    return this.identityService.create(createIdentityInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteIdentity(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.deleteIdentity(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TransactionEntity)
  async createDIDPublishTransaction(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.createDIDPublishTransaction(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DIDPublishEntity)
  async publishIdentity(@Args('input') input: PublishIdentityInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);
    return this.identityService.publishIdentity(input.identityDid, JSON.parse(input.payload));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async getPublicationStatus(@Args('input') input: PublicationStatusInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);
    return this.identityService.getPublicationStatus(input.identityDid, input.publicationId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityEntity], { name: 'identities' })
  findAll(@CurrentUser() user: User) {
    return this.identityService.findAll(user);
  }
}
