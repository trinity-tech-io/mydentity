import { Field, InputType } from '@nestjs/graphql';
import {ActivityType, IntentType} from '@prisma/client';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class CreateActivityInput {
  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => GraphQlJson, {nullable: true})
  content: any;
}
