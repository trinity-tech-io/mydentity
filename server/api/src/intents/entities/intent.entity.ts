import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IntentType } from '@prisma/client';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@ObjectType()
export class IntentEntity {
  @Field()
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => String)
  type: IntentType;

  @Field(() => GraphQlJson)
  requestPayload: any;

  @Field(() => GraphQlJson, { nullable: true })
  responsePayload: any;
}
