import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { CredentialsService } from './credentials.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CredentialEntity } from './entities/credential.entity';

@Resolver(() => CredentialEntity)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) { }

  @Mutation(() => CredentialEntity)
  createCredential(@Args('createCredentialInput') createCredentialInput: CreateCredentialInput, @CurrentUser() user: User) {
    return this.credentialsService.create(createCredentialInput, user);
  }

  @Query(() => [CredentialEntity], { name: 'credentials' })
  findAll(@Args('identityDid') identityDid: string) {
    // TODO: Ensure this identity belongs to the authenticated user
    return this.credentialsService.findAll(identityDid);
  }

  @Mutation(() => Boolean)
  deleteCredential(@Args('id') id: string, @CurrentUser() user: User) {
    return this.credentialsService.remove(id, user);
  }
}
