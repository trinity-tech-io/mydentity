import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCredentialInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  credentialId: string;

  @Field(() => String)
  types: string[];

  @Field(() => Date)
  expirationDate: Date;

  @Field(() => String)
  properties: any;
}
