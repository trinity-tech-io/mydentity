import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GoogleSignInInput {
    @Field(() => String)
    code: string;
}