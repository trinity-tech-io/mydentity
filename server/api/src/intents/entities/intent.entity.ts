import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IntentType } from '@prisma/client/main';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@ObjectType()
export class IntentEntity {
  @Field()
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  fulfilledAt: string;

  @Field(() => String)
  type: IntentType;

  @Field(() => String)
  redirectUrl: string;

  @Field(() => GraphQlJson)
  requestPayload: any;

  @Field(() => GraphQlJson, { nullable: true })
  responsePayload: any;
}
