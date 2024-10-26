import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { ConstantesVerificacion } from './common/constantes-verificacion';
import databaseConfig from './config/data-base.config';
import pinoLoggerConfig from '@bsc/core/config/pino-logger.config';
import { VerificacionModule } from './modules/verificacion.module'


@Module({
  imports: [
    VerificacionModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesVerificacion.TYPEORM_CONFIG),
    }),
    TypeOrmModule.forRootAsync({
      name: "mongodb",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesVerificacion.TYPEORM_MONGO_CONFIG),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get(ConstantesVerificacion.PINO_LOGGER_CONFIG);
        conf.pinoHttp.name = ConstantesVerificacion.VERIFICACION.NAME;
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
