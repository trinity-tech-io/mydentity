import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIdentityInput {
  @Field(() => String, { description: 'Default name to use for an initial name credential' })
  name: string;

  @Field(() => String, { description: 'Hive vault provider address, where identity\'s app data is stored', nullable: true })
  hiveVaultProvider?: string;
}
