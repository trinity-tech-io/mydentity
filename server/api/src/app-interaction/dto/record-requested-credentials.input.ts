import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RecordRequestedCredentialsInput {
  @Field()
  applicationDid: string;

  @Field(() => [String])
  credentialIds: string[];
}
