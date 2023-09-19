import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ImportCredentialInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  credentialString: string;

  @Field(() => String, { nullable: true })
  importingApplicationDid?: string;
}
