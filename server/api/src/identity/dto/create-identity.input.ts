import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIdentityInput {
  @Field(() => String, { description: 'Default name to use for an initial name credential' })
  name: string;
}
