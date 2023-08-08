import { Field, InputType } from '@nestjs/graphql';
import { IntentType } from '@prisma/client';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class CreateIntentInput {
  @Field(() => String)
  type: IntentType;

  @Field(() => GraphQlJson)
  payload: any;
}
