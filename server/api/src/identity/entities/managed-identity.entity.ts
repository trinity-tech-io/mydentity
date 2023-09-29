import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ManagedIdentityEntity {
  @Field(() => String, { description: 'Access token used to manage this unclaimed identity' })
  identityAccessToken: string;

  @Field(() => String, { description: 'did:elastos:xxx' })
  did: string;
}
