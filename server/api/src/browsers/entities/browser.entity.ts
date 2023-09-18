import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BrowserEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  lastUsedAt: Date;

  @Field()
  userAgent: string;

  @Field()
  name: string;
}
