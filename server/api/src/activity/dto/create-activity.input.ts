import {Field, InputType, Int} from '@nestjs/graphql';
import {ActivityType, UserEmailProvider} from '@prisma/client';

@InputType()
export class CreateActivityInput {
  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => UserEmailProvider)
  userEmailProvider?: UserEmailProvider;

  @Field(() => String)
  identityStr?: string;

  @Field(() => Int)
  credentialsCount?: number;

  @Field(() => String)
  appDid?: string;

  @Field(() => String)
  browserName?: string;
}