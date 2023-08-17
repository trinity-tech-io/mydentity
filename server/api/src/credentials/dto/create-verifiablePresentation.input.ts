import { Field, InputType } from '@nestjs/graphql';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class CreateVerifiablePresentationInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => GraphQlJson, {nullable: true})
  credentials: string[];

  @Field(() => String)
  realm: string;

  @Field(() => String)
  nonce: string;
}
