import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifiablePresentionEntity {
  // JSON representation of the W3C Verifiable Presentation (decrypted by the server)
  @Field(() => String)
  verifiablePresentation: string;
}
