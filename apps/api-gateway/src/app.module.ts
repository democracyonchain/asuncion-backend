import pinoLoggerConfig from '@bsc/core/config/pino-logger.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConstantesConfig } from './config/constantes.config';
import graphqlConfig from './config/gql.config';
import {ConstantesGw} from './common/constants/constantes-gw';
import { Base64Scalar, DateScalar } from '@bsc/core';
import { DecimalScalar } from '@bsc/core/shared/dto/scalar-type/decimal-scalar.type';
import { JwtModule } from '@nestjs/jwt';
//modulos
import { autorizacionModule } from './modules/autorizacion/autorizacion.module';
import { administracionModule } from './modules/administracion/administracion.module';
import { digitalizacionModule } from './modules/digitalizacion/digitalizacion.module';
import { verificacionModule } from './modules/verificacion/verificacion.module';
import { reportesModule } from './modules/reportes/reportes.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_TOKEN,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],

      useFactory: (config: ConfigService) => config.get(ConstantesConfig.GQL_CONFIG),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get(ConstantesConfig.PINO_LOGGER_CONFIG);
        conf.pinoHttp.name = ConstantesGw.GATEWAY.NAME;
        return conf;
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [graphqlConfig, pinoLoggerConfig],
      envFilePath: '.env',

    }),

    administracionModule,
    autorizacionModule,
    digitalizacionModule,
    verificacionModule,
    reportesModule
  ],
  controllers: [AppController],
  providers: [
    Base64Scalar,
    DateScalar,
    DecimalScalar,
    AppService,
  ],
})
export class AppModule {}
