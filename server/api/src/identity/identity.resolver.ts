import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User } from '@prisma/client/main';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { DeveloperAccessKeyGuard } from 'src/user/developer-access-key.guard';
import { DeveloperAccess } from 'src/user/developer-access.decorator';
import { AddServiceInput } from './dto/add-service.input';
import { CreateIdentityInput } from './dto/create-identity.input';
import { CreateManagedIdentityInput } from './dto/create-managed-identity.input';
import { SetCredentialVisibilityInput } from './dto/credential-visibility.input';
import { ImportIdentityInput } from './dto/import-identity.input';
import { PublicationStatusInput } from './dto/publication-status.input';
import { RemoveServiceInput } from './dto/remove-service.input';
import { DocumentEntity } from './entities/document.entity';
import { IdentityPublicationStatusEntity } from './entities/identity-publication-status.entity';
import { IdentityEntity } from './entities/identity.entity';
import { ManagedIdentityStatusEntity } from './entities/managed-identity-status.entity';
import { ManagedIdentityEntity } from './entities/managed-identity.entity';
import { PublishResultEntity } from './entities/publish-result.entity';
import { IdentityAccessTokenGuard } from './identity-access-token.guard';
import { IdentityAccess } from './identity-access.decorator';
import { IdentityService } from './identity.service';
import { IdentityAccessInfo } from './model/identity-access-info';

@Resolver(() => IdentityEntity)
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  async createIdentity(@Args('input') createIdentityInput: CreateIdentityInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    return await this.identityService.createFromAPIInput(createIdentityInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  async importIdentity(@Args('input') importIdentityInput: ImportIdentityInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    return await this.identityService.import(importIdentityInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteIdentity(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return await this.identityService.deleteIdentity(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PublishResultEntity)
  async publishIdentity(@Args('identityDid') identityDid: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    const payload = await this.identityService.createDIDPublishTransaction(identityDid, user, browser);
    return this.identityService.publishIdentity(identityDid, payload);
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

  @UseGuards(DeveloperAccessKeyGuard)
  @Mutation(() => ManagedIdentityEntity)
  async createManagedIdentity(@DeveloperAccess() developer: User, @Args('input') input: CreateManagedIdentityInput): Promise<ManagedIdentityEntity> {
    await this.identityService.ensureOwnedApplicationIdentity(input.appDID, developer);

    const createdIdentityInfo = await this.identityService.createManaged(developer, input.appDID);
    if (!createdIdentityInfo)
      return null;

    return {
      identityAccessToken: createdIdentityInfo.identityAccessToken,
      did: createdIdentityInfo.identity.did
    };
  }

  @UseGuards(IdentityAccessTokenGuard)
  @Query(() => ManagedIdentityStatusEntity)
  getManagedIdentityStatus(@IdentityAccess() identityAccess: IdentityAccessInfo) {
    return this.identityService.getManagedIdentityStatus(identityAccess.identity);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async addService(@Args('input') addServiceInput: AddServiceInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(addServiceInput.identityDid, user);
    return this.identityService.addService(addServiceInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeService(@Args('input') removeServiceInput: RemoveServiceInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(removeServiceInput.identityDid, user);
    return this.identityService.removeService(removeServiceInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => DocumentEntity)
  async getLocalDIDDocument(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.getLocalDIDDocument(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async setCredentialVisibility(@Args('input') input: SetCredentialVisibilityInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);
    return this.identityService.setCredentialVisibility(input, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async synchronize(@Args('identityDid') identityDid: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.identityService.synchronize(user, browser);
  }
}
