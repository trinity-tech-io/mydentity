import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestEmailAuthenticationResult {
  @Field({ nullable: true })
  success: boolean;
}
