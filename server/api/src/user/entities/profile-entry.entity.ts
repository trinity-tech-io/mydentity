import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileEntryEntity {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String)
  value: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  visible?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isPrimary?: boolean;
}