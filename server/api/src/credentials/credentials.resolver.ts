import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User } from '@prisma/client/main';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { IdentityAccessTokenGuard } from 'src/identity/identity-access-token.guard';
import { IdentityAccess } from 'src/identity/identity-access.decorator';
import { IdentityService } from 'src/identity/identity.service';
import { IdentityAccessInfo } from 'src/identity/model/identity-access-info';
import { CredentialsService } from './credentials.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CreateVerifiablePresentationInput } from './dto/create-verifiablePresentation.input';
import { ImportCredentialInput } from './dto/import-credential.input';
import { ImportManagedIdentityCredentialsInput } from './dto/import-managed-identity-credentials.input';
import { IssueCredentialInput } from './dto/issue-credential.input';
import { CredentialEntity } from './entities/credential.entity';
import { ImportedManagedIdentityCredentialEntity } from './entities/imported-managed-identity-credential.entity';
import { IssueCredentialEntity } from './entities/issueCredential.entity';
import { VerifiablePresentionEntity } from './entities/verifiablePresention.entity';

@Resolver(() => CredentialEntity)
export class CredentialsResolver {
  constructor(
    private identityService: IdentityService,
    private credentialsService: CredentialsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialEntity)
  async createCredential(@Args('input') createCredentialInput: CreateCredentialInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(createCredentialInput.identityDid, user);
    return this.credentialsService.create(createCredentialInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialEntity)
  async importCredential(@Args('input') importCredentialInput: ImportCredentialInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(importCredentialInput.identityDid, user);
    return this.credentialsService.storeCredential(importCredentialInput, user, browser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IssueCredentialEntity)
  async issueCredential(@Args('input') issueCredentialInput: IssueCredentialInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(issueCredentialInput.identityDid, user);
    return this.credentialsService.issueCredential(issueCredentialInput, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CredentialEntity], { name: 'credentials' })
  async findAll(@Args('identityDid') identityDid: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.credentialsService.findAll(identityDid, user, browser);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteCredential(@Args('id') id: string, @CurrentUser() user: User) {
    await this.credentialsService.ensureOwnedCredential(id, user);
    return this.credentialsService.remove(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => VerifiablePresentionEntity)
  async createVerifiablePresentation(@Args('input') input: CreateVerifiablePresentationInput, @CurrentUser() user: User, @CurrentBrowser() browser: Browser) {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);
    return this.credentialsService.createVerifiablePresentation(input, user, browser);
  }

  @UseGuards(IdentityAccessTokenGuard)
  @Mutation(() => [ImportedManagedIdentityCredentialEntity])
  async importManagedIdentityCredentials(@IdentityAccess() identityAccess: IdentityAccessInfo, @Args('input') input: ImportManagedIdentityCredentialsInput) {
    return this.credentialsService.importManagedIdentityCredentials(identityAccess, input.credentials);
  }
}
