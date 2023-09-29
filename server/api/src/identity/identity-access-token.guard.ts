import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IdentityService } from './identity.service';

@Injectable()
export class IdentityAccessTokenGuard {
  constructor(private readonly identityService: IdentityService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const identityAccessToken = request.headers['x-identity-access-token'];
    if (!identityAccessToken)
      throw new HttpException("An identity access token is required for this operation", 401);

    // Retrieve identity info related to this access token
    const identityAccess = await this.identityService.validateIdentityAccessToken(identityAccessToken);
    if (!identityAccess)
      throw new HttpException("Identity Access key not related to any existing identity.", 401);

    request.identityAccess = identityAccess;

    return true;
  }
}