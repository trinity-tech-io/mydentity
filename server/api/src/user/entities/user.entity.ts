import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  fullName: string;

  @Field(() => Date)
  createdAt: Date;
}
