import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChallengeEntity {
  @Field(() => String, { description: 'The challenge id' })
  id: string;

  @Field(() => String, { description: 'The challenge content' })
  content: string;
}
