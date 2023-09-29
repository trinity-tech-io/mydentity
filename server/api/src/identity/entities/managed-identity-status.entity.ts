import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ManagedIdentityStatusEntity {
  @Field(() => Boolean)
  claimed: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String, { nullable: true })
  claimedAt: string;
}
