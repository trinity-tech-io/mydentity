import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from "./user.entity";
import { UserEmailProvider } from "@prisma/client";

@ObjectType()
export class UserEmailEntity {
    @Field()
    id: string;

    @Field(() => UserEntity)
    user: UserEntity;

    @Field(() => UserEmailProvider)
    provider: UserEmailProvider;

    @Field()
    email: string;

    @Field(() => Date)
    createdAt: Date;
}
