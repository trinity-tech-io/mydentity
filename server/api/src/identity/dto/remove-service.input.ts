import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveServiceInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  serviceId: string;
}
