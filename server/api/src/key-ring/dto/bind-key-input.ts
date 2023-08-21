import { Field, InputType } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@InputType()
export class BindKeyInput {
  @Field(() => String, { description: 'The new type' })
  type: UserShadowKeyType;

  @Field(() => String, { description: 'The new key id' })
  keyId: string;

  @Field(() => String, { description: 'The new key' })
  key: string;

  @Field(() => String, { description: 'The challenge id', nullable: true })
  challengeId?: string;

  @Field(() => String, { description: 'The signature', nullable: true })
  sig?: string;

  @Field(() => String, { description: 'The authentication key type', nullable: true })
  authType?: UserShadowKeyType;

  @Field(() => String, { description: 'The authentication key id', nullable: true})
  authKeyId?: string;

  @Field(() => String, { description: 'The authentication key', nullable: true })
  authKey?: string;

  @Field(() => String, { description: 'The authentication challenge id', nullable: true })
  authChallengeId?: string;

  @Field(() => String, { description: 'The authentication signature', nullable: true })
  authSig?: string;
}
