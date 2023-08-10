import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';
import { ProfileEntryEntity } from './profile-entry.entity';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field(() => UserType)
  type: UserType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [ProfileEntryEntity], { nullable: true })
  ProfileEntries?: ProfileEntryEntity[];
}

registerEnumType(UserType, {
  name: 'UserType',
});
