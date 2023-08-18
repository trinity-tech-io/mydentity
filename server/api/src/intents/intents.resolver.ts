import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateIntentInput } from './dto/create-intent.input';
import { FulfilIntentInput } from './dto/fulfil-intent.input';
import { IntentCreationEntity } from './entities/intent-creation.entity';
import { IntentEntity } from './entities/intent.entity';
import { IntentsService } from './intents.service';

@Resolver(() => IntentEntity)
export class IntentsResolver {
  constructor(private readonly intentsService: IntentsService) { }

  /**
   * API called by the DID Web connector to initiate a DID method flow.
   */
  @Mutation(() => IntentCreationEntity)
  async createIntent(@Args('input') input: CreateIntentInput): Promise<IntentCreationEntity> {
    const intent = await this.intentsService.createIntent(input);
    return {
      intentId: intent.id
    }
  }

  /**
   * API called from out front end to save the response for an intent. The connector will fetch this response by ID
   * right after from the origin dApp.
   */
  // TODO: auth guard
  @Mutation(() => Boolean)
  async fulfilIntent(@Args('input') input: FulfilIntentInput): Promise<boolean> {
    await this.intentsService.fulfilIntent(input);
    return true;
  }

  /**
   * API called from the DID web connector after the browser returns from our web service.
   *
   * This returns the intent, filled with a response. For example, in case
   * of "request credentials" request type, a VP containing some VCs is returned.
   *
   * Once this API is called, the intent is deleted.
   */
  @Mutation(() => IntentEntity, { nullable: true })
  async serveIntentResponse(@Args('id') intentId: string) {
    return this.intentsService.serveIntentResponse(intentId);
  }

  // TODO: auth guard and intent ownership check
  @Query(() => IntentEntity, { name: 'intent', nullable: true })
  findOne(@Args('id') id: string) {
    return this.intentsService.findOne(id);
  }
}
