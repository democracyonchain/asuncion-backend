import 'dotenv/config';

import { CORRELATION_ID_HEADER } from '@bsc/core';
import { registerAs } from '@nestjs/config';
import { Request } from 'express';
import * as moment from 'moment';
import { Params } from 'nestjs-pino';

function pinoConfig(): Params {
  return {
    pinoHttp: {
      level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                messageKey: 'message',
              },
            }
          : undefined,
      messageKey: 'message',
      timestamp: process.env.NODE_ENV == 'production' ? () => `, "time": ${moment().format()}` : true,
      autoLogging: false,
      customProps: (req: Request) => {
        return {
          correlationId: req[CORRELATION_ID_HEADER],
        };
      },
      serializers: {
        req: () => {
          return undefined;
        },
        res: () => {
          return undefined;
        },
      },
    },
  };
}

export default registerAs('pino-logger', () => ({
  config: pinoConfig(),
}));
