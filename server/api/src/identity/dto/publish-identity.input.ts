import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PublishIdentityInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  payload: string;
}
