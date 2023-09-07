import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PublishResultEntity {
  @Field(() => String)
  publicationId: string;
}
