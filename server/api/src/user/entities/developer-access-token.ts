import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeveloperAccessKeyEntity {
    @Field()
    id: string;

    @Field(() => GraphQLISODateTime)
    createdAt: string;

    @Field({ nullable: true })
    title?: string;
}
