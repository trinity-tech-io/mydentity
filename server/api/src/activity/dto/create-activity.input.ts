import { Field, InputType, Int } from '@nestjs/graphql';
import { ActivityType, UserEmailProvider } from '@prisma/client/main';

@InputType()
export class CreateActivityInput {
  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => String, { nullable: true })
  userEmailId?: string;

  @Field(() => UserEmailProvider, { nullable: true })
  userEmailProvider?: UserEmailProvider;

  @Field(() => String, { nullable: true })
  userEmailAddress?: string;

  @Field(() => String, { nullable: true })
  identityId?: string;

  @Field(() => String, { nullable: true })
  identityDid?: string;

  @Field(() => Int, { nullable: true })
  credentialsCount?: number;

  @Field(() => String, { nullable: true })
  appDid?: string;

  @Field(() => String, { nullable: true })
  browserId?: string;

  @Field(() => String, { nullable: true })
  browserName?: string;
}