import { CreateTemporaryAuthInput } from './create-temporary-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTemporaryAuthInput extends PartialType(CreateTemporaryAuthInput) {
  @Field(() => Int)
  id: number;
}
