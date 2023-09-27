import { Field, InputType } from '@nestjs/graphql';
import { GraphQlJson } from 'src/utils/graphql/json.types';

@InputType()
export class AddServiceInput {
  @Field(() => String)
  identityDid: string;

  @Field(() => String)
  serviceId: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  endpoint: string;

  @Field(() => GraphQlJson, {nullable: true})
  properties: any;
}
