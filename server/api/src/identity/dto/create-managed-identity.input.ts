import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateManagedIdentityInput {
  @Field(() => String, { nullable: true })
  unused: string;
}
