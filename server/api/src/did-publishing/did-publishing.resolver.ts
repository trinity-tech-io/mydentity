import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DIDPublishingService } from './did-publishing.service';
import { PublishIdentityInput } from './dto/publish-identity.input';
import { DIDPublishEntity } from './entities/didpublish.entity';

@Resolver(() => DIDPublishEntity)
export class DIDPublishingResolver {
  constructor(private readonly didPublishingService: DIDPublishingService) { }

  @Mutation(() => DIDPublishEntity)
  publishIdentity(@Args('input') input: PublishIdentityInput) {
    const publicationID = this.didPublishingService.publishDID(input.identityDid, JSON.parse(input.payload));
    return {
      publicationID: publicationID
    }
  }
}
