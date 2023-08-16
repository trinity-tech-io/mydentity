import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field(() => UserType)
  type: UserType;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  fullName: string;

  @Field(() => Date)
  createdAt: Date;
}

registerEnumType(UserType, {
  name: 'UserType',
});
