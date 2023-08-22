import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client';

@ObjectType()
export class ShadowKeyEntity {
  //@Field(() => String, { description: 'The key id' })
  //id: string;

  @Field(() => String, { description: 'The key' })
  key: string;

  @Field(() => String, { description: 'The type' })
  type: UserShadowKeyType;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  updatedAt: string;
}
