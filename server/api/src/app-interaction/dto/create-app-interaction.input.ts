import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppInteractionInput {
  @Field()
  identityDid: string;

  @Field()
  applicationDid: string;
}
