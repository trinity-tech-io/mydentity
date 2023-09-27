import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IdentityEntity } from 'src/identity/entities/identity.entity';

@ObjectType()
export class IdentityRootEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  didStoreRootIdentityId: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => [IdentityEntity])
  Identity?: IdentityEntity[];
}
