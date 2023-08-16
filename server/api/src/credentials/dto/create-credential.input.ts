import { Field, InputType } from '@nestjs/graphql';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class CreateCredentialInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  credentialId: string;

  @Field(() => GraphQlJson, {nullable: true})
  types: any;

  @Field(() => String)
  expirationDate: Date;

  @Field(() => GraphQlJson, {nullable: true})
  properties: any;
}
