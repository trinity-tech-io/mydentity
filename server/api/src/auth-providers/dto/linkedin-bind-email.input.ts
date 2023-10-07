import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LinkedinBindEmailInput {
    @Field(() => String)
    code: string;
}