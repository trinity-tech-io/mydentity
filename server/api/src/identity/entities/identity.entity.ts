import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IdentityType } from '@prisma/client/main';

@ObjectType()
export class IdentityEntity {
  @Field(() => String, { description: 'did:elastos:xxx' })
  did: string;

  @Field(() => String)
  type: IdentityType;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  lastUsedAt: Date;

  @Field(() => String)
  identityRootId: string;

  @Field(() => IdentityEntity, { nullable: true })
  creatingAppIdentity?: IdentityEntity;
}
