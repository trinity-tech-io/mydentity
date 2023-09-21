import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdentityEntity {
  @Field(() => String, { description: 'did:elastos:xxx' })
  did: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  lastUsedAt: Date;
}
