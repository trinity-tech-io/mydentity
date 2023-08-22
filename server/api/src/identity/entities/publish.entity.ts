import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PublishEntity {
  @Field(() => String)
  payload: string;
}
