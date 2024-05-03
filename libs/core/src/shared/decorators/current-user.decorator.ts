import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

export const CurrentUserWithToken = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  const token = request.headers.authorization?.split(" ");
  return {user:ctx.getContext().req.user,token:token[1]};
});