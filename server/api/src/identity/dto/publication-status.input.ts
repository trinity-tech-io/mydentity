import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PublicationStatusInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  publicationId: string;
}
