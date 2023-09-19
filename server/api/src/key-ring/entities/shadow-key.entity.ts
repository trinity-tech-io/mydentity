import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { UserShadowKeyType } from '@prisma/client/main';
import { BrowserEntity } from 'src/browsers/entities/browser.entity';

@ObjectType()
export class ShadowKeyEntity {
  @Field(() => String, { description: 'The key id' })
  keyId: string;

  @Field(() => String, { description: 'The key' })
  key: string;

  @Field(() => String, { description: 'The type' })
  type: UserShadowKeyType;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  updatedAt: string;

  @Field(() => BrowserEntity, { nullable: true })
  browser?: BrowserEntity;
}
