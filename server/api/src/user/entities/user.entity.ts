import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  fullName: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field({ nullable: true })
  defaultRootIdentityId: string;
}
