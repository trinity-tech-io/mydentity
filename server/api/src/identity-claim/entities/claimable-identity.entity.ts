import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClaimableIdentityEntity {
  @Field(() => String)
  did: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => Int, { description: "Number of VCs currently issued to this identity" })
  credentialsCount: number;

  @Field(() => String, { description: "DID of the app that created this managed identity" })
  creatingAppDid: string;
}
