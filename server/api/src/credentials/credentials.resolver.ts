import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CredentialsService } from './credentials.service';
import { AddCredentialInput } from './dto/add-credential.input';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CreateVerifiablePresentationInput } from './dto/create-verifiablePresentation.input';
import { CredentialEntity } from './entities/credential.entity';
import { VerifiablePresentionEntity } from './entities/verifiablePresention.entity';

@Resolver(() => CredentialEntity)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialEntity)
  createCredential(@Args('input') createCredentialInput: CreateCredentialInput, @CurrentUser() user: User) {
    return this.credentialsService.create(createCredentialInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialEntity)
  addCredential(@Args('input') addCredentialInput: AddCredentialInput, @CurrentUser() user: User) {
    return this.credentialsService.storeCredential(addCredentialInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CredentialEntity], { name: 'credentials' })
  findAll(@Args('identityDid') identityDid: string, @CurrentUser() user: User) {
    // TODO: Ensure this identity belongs to the authenticated user
    return this.credentialsService.findAll(identityDid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deleteCredential(@Args('credentialId') credentialId: string, @CurrentUser() user: User) {
    return this.credentialsService.remove(credentialId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => VerifiablePresentionEntity)
  createVerifiablePresentation(@Args('input') createVerifiablePresentationInput: CreateVerifiablePresentationInput, @CurrentUser() user: User) {
    return this.credentialsService.createVerifiablePresentation(createVerifiablePresentationInput, user);
  }
}
