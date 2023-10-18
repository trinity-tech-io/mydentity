import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TemporaryAuth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
