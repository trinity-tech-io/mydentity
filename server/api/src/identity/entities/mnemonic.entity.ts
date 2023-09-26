import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MnemonicEntity {
  @Field(() => String)
  mnemonic: string;
}
