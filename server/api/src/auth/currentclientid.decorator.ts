import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * For now, the client ID is a unique uuid generated when signing in from a browser.
 * This allows to distinguish 2 different clients.
 */
export const CurrentClientID = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user.clientId;
  },
);