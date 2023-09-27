import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { UserEmailProvider } from "@prisma/client/main";
import { UserEntity } from "./user.entity";

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

    @Field(() => GraphQLISODateTime)
    createdAt: string;
}
