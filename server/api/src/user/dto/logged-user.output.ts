import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUserOutput {
  @Field(() => String, { description: 'Generated access_token of the signed in user' })
  accessToken: string;

  @Field(() => String, { description: 'Used to refresh token when expired.' })
  refreshToken: string;
}