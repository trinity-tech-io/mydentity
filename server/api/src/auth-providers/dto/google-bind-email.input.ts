import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GoogleBindEmailInput {
    @Field(() => String)
    code: string;
}