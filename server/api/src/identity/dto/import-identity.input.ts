import { Field, InputType } from '@nestjs/graphql';
import { IdentityType } from '@prisma/client/main';

@InputType()
export class ImportIdentityInput {
  @Field(() => String)
  identityType: IdentityType;

  @Field()
  mnemonic: string;
}
