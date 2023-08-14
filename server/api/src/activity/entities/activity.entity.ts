import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {ActivityType } from '@prisma/client';
import {GraphQlJson} from "../../utils/graphql/json.types";

@ObjectType()
export class ActivityEntity {
    @Field()
    id: string;

    @Field(() => ActivityType)
    type: ActivityType;

    @Field(() => GraphQlJson, {nullable: true})
    content: any;

    @Field(() => Date)
    createdAt: Date;
}

registerEnumType(ActivityType, {
    name: 'ActivityType',
});
