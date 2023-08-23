import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionEntity {
  @Field(() => String)
  payload: string;
}
