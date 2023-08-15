import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenOutput {
  @Field(() => String, { description: 'Generated access_token of the signed in user' })
  accessToken: string;
}