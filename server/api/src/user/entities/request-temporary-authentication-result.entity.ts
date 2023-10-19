import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestTemporaryAuthenticationResult {
  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  pinCode?: string;
}
