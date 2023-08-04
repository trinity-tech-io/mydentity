import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CredentialEntity {
  @Field(() => String)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  // JSON representation of the W3C Verifiable Credential (decrypted by the server)
  @Field(() => String)
  verifiableCredential: string;
}
