import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateManagedIdentityInput {
  @Field(() => String)
  appDID: string; // Application creating the DID. Must belong to the same acccount as the developer access key
}
