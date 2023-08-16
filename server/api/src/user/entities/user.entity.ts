import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field(() => UserType)
  type: UserType;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  email: string;

  @Field({nullable: true})
  fullName: string;

  @Field(() => Date)
  createdAt: Date;
}

registerEnumType(UserType, {
  name: 'UserType',
});
