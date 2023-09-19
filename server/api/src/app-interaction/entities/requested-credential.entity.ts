import { Field, ObjectType } from '@nestjs/graphql';
import { CredentialEntity } from 'src/credentials/entities/credential.entity';

@ObjectType()
export class RequestedCredentialEntity {
  @Field()
  id: string;

  @Field(() => CredentialEntity)
  credential: CredentialEntity;
}
