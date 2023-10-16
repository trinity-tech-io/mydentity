import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClaimIdentityInput {
  @Field(() => String)
  requestId: string;

  @Field(() => String)
  nonce: string;
}
