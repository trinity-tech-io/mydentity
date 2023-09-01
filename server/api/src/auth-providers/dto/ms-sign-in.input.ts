import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MsSignInInput {
    @Field(() => String)
    code: string;
}