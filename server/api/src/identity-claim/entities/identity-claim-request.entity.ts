import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ClaimableIdentityEntity } from './claimable-identity.entity';

@ObjectType()
export class IdentityClaimRequestEntity {
  @Field(() => String)
  id: string;

  @Field(() => ClaimableIdentityEntity)
  identityInfo: ClaimableIdentityEntity;

  @Field(() => String)
  claimUrl?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  expiresAt?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  claimCompletedAt?: string;
}
