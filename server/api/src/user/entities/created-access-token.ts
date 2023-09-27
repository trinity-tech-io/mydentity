import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperAccessTokenEntity } from './developer-access-token';

@ObjectType()
export class CreatedAccessTokenEntity {
  @Field(() => DeveloperAccessTokenEntity)
  storedToken: DeveloperAccessTokenEntity;

  @Field()
  clearToken: string;
}
