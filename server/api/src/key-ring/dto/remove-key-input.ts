import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveKeyInput {
  @Field(() => String, { description: 'The key to be remove'})
  keyId: string;
}
