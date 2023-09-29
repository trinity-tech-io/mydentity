import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

/**
 * Use this decorator only during sign up/in operations in order to retrieve the additional browser key
 * header passed by the client, while we have no user access token yet.
 * For other cases, use "@CurrentBrowser".
 */
export const HeaderBrowserKey = createParamDecorator<unknown, ExecutionContext>(
  (data, context) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx?.getContext()?.req?.headers['x-browser-key'] || null;
  }
);