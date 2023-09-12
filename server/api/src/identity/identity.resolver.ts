import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { CreateIdentityInput } from './dto/create-identity.input';
import { PublicationStatusInput } from './dto/publication-status.input';
import { PublishIdentityInput } from './dto/publish-identity.input';
import { IdentityPublicationStatusEntity } from './entities/identity-publication-status.entity';
import { IdentityEntity } from './entities/identity.entity';
import { PublishResultEntity } from './entities/publish-result.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { IdentityService } from './identity.service';

@Resolver(() => IdentityEntity)
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  createIdentity(@Args('input') createIdentityInput: CreateIdentityInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    return this.identityService.create(createIdentityInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteIdentity(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.deleteIdentity(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TransactionEntity)
  async createDIDPublishTransaction(@Args('identityDid') identityDid: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.createDIDPublishTransaction(identityDid, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PublishResultEntity)
  async publishIdentity(@Args('input') input: PublishIdentityInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);
    return this.identityService.publishIdentity(input.identityDid, JSON.parse(input.payload));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityPublicationStatusEntity)
  async getPublicationStatus(@Args('input') input: PublicationStatusInput, @CurrentUser() user: User): Promise<IdentityPublicationStatusEntity> {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);

    return {
      state: await this.identityService.getPublicationStatus(input.identityDid)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityEntity], { name: 'identities' })
  findAll(@CurrentUser() user: User) {
    return this.identityService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async markIdentityInUse(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.markIdentityInUse(identityDid);
  }
}
