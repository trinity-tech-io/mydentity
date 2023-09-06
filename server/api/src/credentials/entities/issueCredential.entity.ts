import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IssueCredentialEntity {
  @Field(() => String)
  verifiableCredential: string;
}
