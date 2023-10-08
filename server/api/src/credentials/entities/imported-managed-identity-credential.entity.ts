import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImportedManagedIdentityCredentialEntity {
  @Field(() => String)
  id: string; // VerifiableCredential id
}
