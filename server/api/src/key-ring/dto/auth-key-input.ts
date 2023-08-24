import { Field, InputType } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@InputType()
export class AuthKeyInput {
  @Field(() => String, { description: 'The key type' })
  type: UserShadowKeyType

  @Field(() => String, { description: 'The key id to do the authorization' })
  keyId: string

  @Field(() => String, { description: 'The password or webauthn response' })
  key: string

  @Field(() => String, { description: 'The challenge id for webauthn', nullable: true })
  challengeId?: string;
}
