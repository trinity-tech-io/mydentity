import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCredentialInput {
  @Field(() => String)
  identityDid: string;
}
