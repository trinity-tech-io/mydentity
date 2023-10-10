import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClaimIdentityInput {
  @Field(() => String)
  todo: string;
}
