import { Field, InputType } from '@nestjs/graphql';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class FulfilIntentInput {
  @Field()
  intentId: string;

  @Field(() => GraphQlJson, { nullable: true })
  payload: any;
}
