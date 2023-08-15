import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CredentialsService } from './credentials.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CredentialEntity } from './entities/credential.entity';

@Resolver(() => CredentialEntity)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialEntity)
  createCredential(@Args('createCredentialInput') createCredentialInput: CreateCredentialInput, @CurrentUser() user: User) {
    return this.credentialsService.create(createCredentialInput, user);
  }

  @Query(() => [CredentialEntity], { name: 'credentials' })
  findAll(@Args('identityDid') identityDid: string) {
    // TODO: Ensure this identity belongs to the authenticated user
    return this.credentialsService.findAll(identityDid);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deleteCredential(@Args('credentialId') credentialId: string, @CurrentUser() user: User) {
    return this.credentialsService.remove(credentialId, user);
  }
}
