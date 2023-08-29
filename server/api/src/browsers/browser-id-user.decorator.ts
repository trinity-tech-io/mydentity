import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentBrowserID = createParamDecorator<unknown, ExecutionContext>(
  (data, context) => {
    const ctx = GqlExecutionContext.create(context);
    console.log("ctx?.getContext()?.req?.user", ctx?.getContext()?.req?.user)
    return ctx?.getContext()?.req?.user?.browserId || null;
  },
);