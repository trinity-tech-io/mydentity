import { Field, InputType } from '@nestjs/graphql';
import { IdentityType } from '@prisma/client/main';

@InputType()
export class CreateIdentityInput {
  @Field(() => String, { description: 'Default name to use for an initial name credential' })
  name: string;

  @Field(() => String)
  identityType: IdentityType;

  @Field(() => String, { nullable: true })
  rootIdentityId?: string;

  @Field(() => String, { description: 'Hive vault provider address, where identity\'s app data is stored', nullable: true })
  hiveVaultProvider?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true, description: "Whether to publish the created DID on chain right now" })
  publish?: boolean;
}
