import {Field, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {ActivityType, UserEmailProvider} from '@prisma/client';

@ObjectType()
export class ActivityEntity {
    @Field()
    id: string;

    @Field(() => ActivityType)
    type: ActivityType;

    @Field(() => UserEmailProvider)
    userEmailProvider?: UserEmailProvider;

    @Field(() => String)
    identityStr?: string;

    @Field(() => Int)
    credentialsCount?: number;

    @Field(() => String)
    appDid?: string;

    @Field(() => String)
    browserName?: string;

    @Field(() => Date)
    createdAt: Date;
}

registerEnumType(ActivityType, {
    name: 'ActivityType',
});

registerEnumType(UserEmailProvider, {
    name: 'UserEmailProvider',
});
