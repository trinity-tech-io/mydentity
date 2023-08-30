import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddCredentialInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  credentialString: string;
}
