import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BrowserEntity {
  @Field(() => String)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  lastUsedAt: string;

  @Field()
  userAgent: string;

  @Field()
  name: string;
}
