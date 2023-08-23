import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DIDPublishEntity {
  @Field(() => String)
  txid: string;
}
