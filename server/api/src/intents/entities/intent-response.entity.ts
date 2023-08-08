import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@ObjectType()
export class IntentResponseEntity {
  @Field()
  intentId: string;

  @Field(() => GraphQlJson)
  responsePayload: any;
}
