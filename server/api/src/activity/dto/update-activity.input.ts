import { Field, InputType } from '@nestjs/graphql';
import { ActivityType } from '@prisma/client';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class UpdateActivityInput {
  @Field()
  id: string;

  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => GraphQlJson, {nullable: true})
  content: any;
}
