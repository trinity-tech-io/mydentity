import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteActivitiesInput {
  @Field(() => [String])
  ids: string[];
}