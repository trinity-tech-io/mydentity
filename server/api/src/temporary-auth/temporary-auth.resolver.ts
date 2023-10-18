import { Resolver } from '@nestjs/graphql';
import { TemporaryAuth } from './entities/temporary-auth.entity';
import { TemporaryAuthService } from './temporary-auth.service';

@Resolver(() => TemporaryAuth)
export class TemporaryAuthResolver {
  constructor(
    private readonly temporaryAuthService: TemporaryAuthService
  ) { }
}
