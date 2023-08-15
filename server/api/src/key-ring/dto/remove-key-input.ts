import { InputType, Field } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@InputType()
export class RemoveKeyInput {
  @Field(() => String, { description: 'The key to be remove' })
  key: string;

  @Field(() => UserShadowKeyType, { description: 'The key type'})
  type: UserShadowKeyType;
}
