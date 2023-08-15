import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@ObjectType()
export class ShadowKeyEntity {
  @Field(() => String, { description: 'The key' })
  key: string;

  @Field(() => UserShadowKeyType, { description: 'The type' })
  type: UserShadowKeyType;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  updatedAt: string;
}
