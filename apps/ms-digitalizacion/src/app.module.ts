import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { ConstantesDigitalizacion } from './common/constantes-digitalizacion';
import databaseConfig from './config/data-base.config';
import pinoLoggerConfig from '@bsc/core/config/pino-logger.config';
import { DigitalizacionModule } from './modules/digitalizacion.module'


@Module({
  imports: [
    DigitalizacionModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesDigitalizacion.TYPEORM_CONFIG),
    }),
    TypeOrmModule.forRootAsync({
      name: "mongodb",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesDigitalizacion.TYPEORM_MONGO_CONFIG),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get(ConstantesDigitalizacion.PINO_LOGGER_CONFIG);
        conf.pinoHttp.name = ConstantesDigitalizacion.DIGITALIZACION.NAME;
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
