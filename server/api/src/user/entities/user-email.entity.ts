import { Field, ObjectType } from '@nestjs/graphql';
import {UserEntity} from "./user.entity";

@ObjectType()
export class UserEmailEntity {
    @Field()
    id: string;

    @Field(() => UserEntity)
    user: UserEntity;

    @Field({nullable: true})
    email: string;

    @Field(() => Date)
    createdAt: Date;
}
