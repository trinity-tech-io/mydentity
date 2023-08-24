import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserPropertyInput {
    @Field(() => String)
    name: string;
}
