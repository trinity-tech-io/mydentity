import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field(() => String)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field()
  userAgent: string;

  @Field()
  name: string;
}
