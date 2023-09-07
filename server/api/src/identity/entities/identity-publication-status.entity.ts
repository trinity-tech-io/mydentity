import { Field, ObjectType } from '@nestjs/graphql';
import { IdentityPublicationState } from '../model/identity-publication-state';

@ObjectType()
export class IdentityPublicationStatusEntity {
  @Field(() => String)
  state: IdentityPublicationState;
}
