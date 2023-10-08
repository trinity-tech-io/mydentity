import { Field, ObjectType } from '@nestjs/graphql';
import { IdentityEntity } from 'src/identity/entities/identity.entity';

@ObjectType()
export class IdentityClaimRequestEntity {
  @Field(() => String)
  id: string;

  @Field(() => IdentityEntity)
  identity: IdentityEntity;

  @Field(() => String)
  claimUrl: string;
}
