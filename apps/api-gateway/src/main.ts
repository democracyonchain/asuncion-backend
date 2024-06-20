import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger as LoggerPino } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { json } from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{ cors: true, bodyParser: false });
  const config = app.get(ConfigService);
  const corsAllowed = JSON.parse(process.env.ALLOWED_CORS)

  app.use(json({ limit: '3mb' }));
  app.useLogger(app.get(LoggerPino));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: false,
      forbidNonWhitelisted: false,
      forbidUnknownValues:false,
    }),
  );
  app.enableCors({
    origin:corsAllowed,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

 
  app.set('trust proxy', true);
  const PORT = parseInt(config.get<string>('API_GATEWAY_PORT'), 10);
  await app.listen(PORT).then(() => {
    Logger.log(`Api gateway escuchando en el puerto ${PORT}`, 'Gateway');
  });

  app.use(helmet());
}
bootstrap();
