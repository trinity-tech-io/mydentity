import { Field, InputType, Int } from '@nestjs/graphql';
import { ActivityType, UserEmailProvider } from '@prisma/client/main';

@InputType()
export class CreateActivityInput {
  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => UserEmailProvider, { nullable: true })
  userEmailProvider?: UserEmailProvider;

  @Field(() => String, { nullable: true })
  identityStr?: string;

  @Field(() => Int, { nullable: true })
  credentialsCount?: number;

  @Field(() => String, { nullable: true })
  appDid?: string;

  @Field(() => String, { nullable: true })
  browserId?: string;

  @Field(() => String, { nullable: true })
  browserName?: string;
}