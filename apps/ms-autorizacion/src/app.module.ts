import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { ConstantesAutorizacion } from './common/constantes-autorizacion';
import databaseConfig from './config/data-base.config';
import pinoLoggerConfig from '@bsc/core/config/pino-logger.config';
import { AutorizacionModule } from './modules/autorizacion.module'
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_TOKEN,
      signOptions: { expiresIn: "1d" },
    }),
    AutorizacionModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesAutorizacion.TYPEORM_CONFIG),
    }),
    TypeOrmModule.forRootAsync({
      name: "mongodb",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesAutorizacion.TYPEORM_MONGO_CONFIG),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get(ConstantesAutorizacion.PINO_LOGGER_CONFIG);
        conf.pinoHttp.name = ConstantesAutorizacion.AUTORIZACION.NAME;
        return conf;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, pinoLoggerConfig],
      envFilePath: '.env',
    }),
  ],
})
export class AppModule { }
