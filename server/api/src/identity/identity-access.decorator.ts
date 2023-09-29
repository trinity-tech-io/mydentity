import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IdentityAccessInfo } from './model/identity-access-info';

/**
 * GQL API parameter decorator to access the identity extracted from a call to 
 * @UseGuards(IdentityAccessTokenGuard).
 */
export const IdentityAccess = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req;

    const identityAccess: IdentityAccessInfo = request.identityAccess;
    return identityAccess;
  },
);