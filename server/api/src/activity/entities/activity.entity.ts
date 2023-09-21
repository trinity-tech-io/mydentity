import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActivityType, UserEmailProvider } from '@prisma/client/main';
import { BrowserEntity } from "../../browsers/entities/browser.entity";
import { UserEmailEntity } from "../../user/entities/user-email.entity";
import { IdentityEntity } from "../../identity/entities/identity.entity";

@ObjectType()
export class ActivityEntity {
    @Field()
    id: string;

    @Field(() => ActivityType)
    type: ActivityType;

    @Field(() => UserEmailEntity, { nullable: true })
    userEmail?: UserEmailEntity;

    @Field(() => UserEmailProvider, { nullable: true })
    userEmailProvider?: UserEmailProvider;

    @Field(() => String, { nullable: true })
    userEmailAddress?: string;

    @Field(() => IdentityEntity, { nullable: true })
    identity?: IdentityEntity;

    @Field(() => String, { nullable: true })
    identityDid?: string;

    @Field(() => Int, { nullable: true })
    credentialsCount?: number;

    @Field(() => String, { nullable: true })
    appDid?: string;

    @Field(() => BrowserEntity, { nullable: true })
    browser?: BrowserEntity;

    @Field(() => String, { nullable: true })
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
