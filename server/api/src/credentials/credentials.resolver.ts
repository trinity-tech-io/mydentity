import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IdentityService } from 'src/identity/identity.service';
import { CredentialsService } from './credentials.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CreateVerifiablePresentationInput } from './dto/create-verifiablePresentation.input';
import { ImportCredentialInput } from './dto/import-credential.input';
import { IssueCredentialInput } from './dto/issue-credential.input';
import { CredentialEntity } from './entities/credential.entity';
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
  async createCredential(@Args('input') createCredentialInput: CreateCredentialInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(createCredentialInput.identityDid, user);
    return this.credentialsService.create(createCredentialInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialEntity)
  async importCredential(@Args('input') importCredentialInput: ImportCredentialInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(importCredentialInput.identityDid, user);
    return this.credentialsService.storeCredential(importCredentialInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IssueCredentialEntity)
  async issueCredential(@Args('input') issueCredentialInput: IssueCredentialInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(issueCredentialInput.identityDid, user);
    return this.credentialsService.issueCredential(issueCredentialInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CredentialEntity], { name: 'credentials' })
  async findAll(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(identityDid, user);
    return this.credentialsService.findAll(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteCredential(@Args('id') id: string, @CurrentUser() user: User) {
    await this.credentialsService.ensureOwnedCredential(id, user);
    return this.credentialsService.remove(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => VerifiablePresentionEntity)
  async createVerifiablePresentation(@Args('input') input: CreateVerifiablePresentationInput, @CurrentUser() user: User) {
    await this.identityService.ensureOwnedIdentity(input.identityDid, user);
    return this.credentialsService.createVerifiablePresentation(input, user);
  }
}
