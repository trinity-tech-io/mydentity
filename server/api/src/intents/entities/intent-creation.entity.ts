import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IntentCreationEntity {
  @Field()
  intentId: string;
}
