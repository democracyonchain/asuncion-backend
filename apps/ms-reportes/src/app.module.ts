import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { ConstantesReportes } from './common/constantes-reportes';
import databaseConfig from './config/data-base.config';
import pinoLoggerConfig from '@bsc/core/config/pino-logger.config';
import { ReportesModule } from './modules/reportes.module'


@Module({
  imports: [
    ReportesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesReportes.TYPEORM_CONFIG),
    }),
    TypeOrmModule.forRootAsync({
      name: "mongodb",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(ConstantesReportes.TYPEORM_MONGO_CONFIG),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get(ConstantesReportes.PINO_LOGGER_CONFIG);
        conf.pinoHttp.name = ConstantesReportes.REPORTES.NAME;
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
