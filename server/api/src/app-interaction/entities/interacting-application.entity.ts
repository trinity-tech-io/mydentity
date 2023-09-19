import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InteractingApplicationEntity {
  @Field()
  id: string;

  @Field()
  did: string;
}
