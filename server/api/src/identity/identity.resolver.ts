import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateIdentityInput } from './dto/create-identity.input';
import { IdentityEntity } from './entities/identity.entity';
import { DIDService } from './identity.service';

@Resolver(() => IdentityEntity)
export class IdentityResolver {
  constructor(private readonly didService: DIDService) { }

  @Mutation(() => IdentityEntity)
  createDID(@Args('input') createDidInput: CreateIdentityInput) {
    return this.didService.create(createDidInput);
  }

  @Query(() => [IdentityEntity], { name: 'identities' })
  findAll() {
    return this.didService.findAll();
  }
}
