import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const HeaderBrowserId = createParamDecorator<unknown, ExecutionContext>(
  (data, context) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx?.getContext()?.req?.headers['x-browser-id'] || null;
  }
);