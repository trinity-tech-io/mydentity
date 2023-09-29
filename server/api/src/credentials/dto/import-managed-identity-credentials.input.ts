import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ImportManagedIdentityCredentialsInput {
  @Field(() => [String])
  credentials: string[];
}
