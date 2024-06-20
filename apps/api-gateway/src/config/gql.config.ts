import 'dotenv/config';

import { ApolloDriverConfig } from '@nestjs/apollo';
import { registerAs } from '@nestjs/config';

function apolloDriverConfig(): ApolloDriverConfig {
  
  return {
    autoSchemaFile: './apps/api-gateway/graphql/schema.gql',
    sortSchema: true,
    playground: process.env.GQL_PLAYGROUND_ACTIVO == '1',
    buildSchemaOptions: {
      dateScalarMode: 'isoDate',
    },
    cache: 'bounded',
    persistedQueries: false,
  };
}

export default registerAs('gql', () => ({
  config: apolloDriverConfig(),
}));
