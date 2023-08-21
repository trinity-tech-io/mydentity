import { Field, InputType } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@InputType()
export class AuthKeyInput {
  @Field(() => String, { description: 'The key type' })
  type: UserShadowKeyType

  @Field(() => String, { description: 'The key id to do the authorization' })
  keyId: string

  @Field(() => String, { description: 'The password', nullable: true })
  password?: string

  @Field(() => String, { description: 'The challenge id', nullable: true })
  challengeId?: string;

  @Field(() => String, { description: 'The signature', nullable: true })
  sig?: string
}
