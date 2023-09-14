import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Returns the browser related to the signed in user's access token. This is
 * the decorator to use for most operations that involved the "user's browser".
 */
export const CurrentBrowser = createParamDecorator<unknown, ExecutionContext>(
  (data, context) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx?.getContext()?.req?.user?.browser || null;
  },
);