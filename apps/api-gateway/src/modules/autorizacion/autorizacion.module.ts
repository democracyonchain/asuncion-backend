import { Module } from '@nestjs/common';
import { ClientProxyService } from '../../config/client-proxy.service';

// RESOLVERS


import { AutorizacionQueryResolver } from './resolvers/autorizacion-query.resolver';


// SERVICIOS

import { AutorizacionService } from './services/autorizacion.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    ClientProxyService,
    AutorizacionQueryResolver,
    AutorizacionService
  ],
  exports: [
    ClientProxyService,
    ClientProxyService,  
    AutorizacionQueryResolver,
    AutorizacionService
  ],
})
export class autorizacionModule {}
