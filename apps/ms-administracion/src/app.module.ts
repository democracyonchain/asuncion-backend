import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { ConstantesAdministracion } from '../src/common/constantes-administracion';
import databaseConfig from './config/data-base.config';
import pinoLoggerConfig from '@bsc/core/config/pino-logger.config';
import { AdministracionModule } from './modules/administracion.module'
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRE_TOKEN,
      signOptions: { expiresIn: "1d" },
    }),
    AdministracionModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesAdministracion.TYPEORM_CONFIG),
    }),
    TypeOrmModule.forRootAsync({
      name: "mongodb",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesAdministracion.TYPEORM_MONGO_CONFIG),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get(ConstantesAdministracion.PINO_LOGGER_CONFIG);
        conf.pinoHttp.name = ConstantesAdministracion.ADMINISTRACION.NAME;
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
