import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestEmailAuthenticationResult {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  pinCode?: string;
}
