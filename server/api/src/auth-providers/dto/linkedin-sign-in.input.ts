import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LinkedinSignInInput {
    @Field(() => String)
    code: string;
}