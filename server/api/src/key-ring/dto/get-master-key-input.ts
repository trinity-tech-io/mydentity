import { InputType, Field } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@InputType()
export class GetMasterKeyInput {
  @Field(() => String, { description: 'The key to do the authorization' })
  key: string

  @Field(() => UserShadowKeyType, { description: 'The key type' })
  type: UserShadowKeyType

  @Field(() => String, { description: 'The signature', nullable: true})
  sig?: string
}
