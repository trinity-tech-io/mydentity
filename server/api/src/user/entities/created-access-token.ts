import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperAccessKeyEntity } from './developer-access-token';

@ObjectType()
export class CreatedAccessKeyEntity {
  @Field(() => DeveloperAccessKeyEntity)
  storedKey: DeveloperAccessKeyEntity;

  @Field()
  clearKey: string;
}
