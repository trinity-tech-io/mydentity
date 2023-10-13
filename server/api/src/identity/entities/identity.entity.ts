import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IdentityType } from '@prisma/client/main';

@ObjectType()
export class IdentityEntity {
  @Field(() => String, { description: 'did:elastos:xxx' })
  did: string;

  @Field(() => String)
  type: IdentityType;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  lastUsedAt: string;

  @Field(() => String)
  identityRootId: string;

  @Field(() => IdentityEntity, { nullable: true })
  creatingAppIdentity?: IdentityEntity;
}
