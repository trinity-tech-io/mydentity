import { Field, ObjectType } from '@nestjs/graphql';
import { InteractingApplicationEntity } from './interacting-application.entity';

@ObjectType()
export class IdentityInteractingApplicationEntity {
  @Field()
  id: string;

  @Field(() => InteractingApplicationEntity)
  interactingApplication: InteractingApplicationEntity;
}
