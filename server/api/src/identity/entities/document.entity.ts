import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DocumentEntity {
  @Field(() => String)
  didDocument: string;
}
