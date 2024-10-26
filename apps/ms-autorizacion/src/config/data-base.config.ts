import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseLogger } from '@bsc/core';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_BSC_HOST,
    port: parseInt(process.env.DB_BSC_PORT),
    username: process.env.DB_BSC_USER,
    password: process.env.DB_BSC_PASS,
    database: process.env.DB_BSC_NAME,
    entities: [__dirname + '../**/**/*entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logger: new DatabaseLogger(),
    logging: ['query', 'error'],
  };
}

function typeormModuleMongoOptions(): TypeOrmModuleOptions {
  return {
    type: 'mongodb',
    host: process.env.DB_MONGO_HOST,
    port: parseInt(process.env.DB_MONGO_PORT),
    database: process.env.DB_MONGO_NAME,
    entities: [__dirname + '/../modules/entities/audit/*.entity.{ts,js}'],
    synchronize: true,
  };
}

export default registerAs('database', () => ({
  config: typeormModuleOptions(),
  configMongo:typeormModuleMongoOptions()
}));
