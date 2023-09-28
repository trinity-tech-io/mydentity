import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SetCredentialVisibilityInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  credentialId: string;

  @Field(() => Boolean)
  visible: boolean;
}
