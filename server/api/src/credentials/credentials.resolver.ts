import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CredentialsService } from './credentials.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CredentialEntity } from './entities/credential.entity';

@Resolver(() => CredentialEntity)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) { }

  @Mutation(() => CredentialEntity)
  createCredential(@Args('createCredentialInput') createCredentialInput: CreateCredentialInput) {
    return this.credentialsService.create(createCredentialInput);
  }

  @Query(() => [CredentialEntity], { name: 'credentials' })
  findAll(@Args('identityDid') identityDid: string) {
    // TODO: Ensure this identity belongs to the authenticated user
    return this.credentialsService.findAll(identityDid);
  }

  @Mutation(() => CredentialEntity)
  removeCredential(@Args('id', { type: () => Int }) id: number) {
    return this.credentialsService.remove(id);
  }
}
