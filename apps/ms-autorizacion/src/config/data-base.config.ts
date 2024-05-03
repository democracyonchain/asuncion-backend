import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseLogger } from '@bsc/core';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_RDAC_HOST,
    port: parseInt(process.env.DB_RDAC_PORT),
    username: process.env.DB_RDAC_USER_USR_BSC,
    password: process.env.DB_RDAC_PASS_USR_BSC,
    database: process.env.DB_RDAC_NAME,
    entities: [__dirname + '../**/**/*entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logger: new DatabaseLogger(),
    logging: ['query', 'error'],
  };
}
export default registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
