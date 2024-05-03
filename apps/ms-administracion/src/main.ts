/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-02-16 15:02:00
 * @ Modified by: Anthony Loyaga
 * @ Modified time: 2023-01-24 10:27:48
 * @ Description:
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger as LoggerPino } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = parseInt(process.env.MS_ADMINISTRACION_PORT) || 3010;
  const HOST = process.env.MS_ADMINISTRACION_HOST || 'localhost';
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    logger: ['error', 'warn', 'log'],
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: HOST,
      port: PORT,
    },
  });

  app.useLogger(app.get(LoggerPino));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen().then(() => {
    Logger.log(`${HOST} escuchando en el puerto ${PORT}`, 'MS-ADMINISTRACION');
  });
}
bootstrap();
