import { Field, InputType } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@InputType()
export class BindKeyInput {
  @Field(() => String, { description: 'The new key' })
  key: string;

  @Field(() => String, { description: 'The new type' })
  type: UserShadowKeyType;

  @Field(() => String, { description: 'The signature', nullable: true })
  sig?: string

  @Field(() => String, { description: 'The existing key to do the authorization', nullable: true })
  authorizationKey?: string

  @Field(() => String, { description: 'The existing key type', nullable: true })
  authorizationType?: UserShadowKeyType

  @Field(() => String, { description: 'The authorization signature', nullable: true })
  authorizationKeySig?: string
}
