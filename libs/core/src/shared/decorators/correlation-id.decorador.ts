import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { CORRELATION_ID_HEADER } from '../middlewares';

export const CorrelationId = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;
  return req[CORRELATION_ID_HEADER];
});
