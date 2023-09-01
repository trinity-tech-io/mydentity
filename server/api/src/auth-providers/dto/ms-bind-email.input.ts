import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MsBindEmailInput {
    @Field(() => String)
    code: string;
}