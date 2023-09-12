import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdentityEntity {
  @Field(() => String, { description: 'did:elastos:xxx' })
  did: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  lastUsedAt: string;
}
