import { Module } from '@nestjs/common';
import { ClientProxyService } from '../../config/client-proxy.service';

// RESOLVERS
import { ProvinciaQueryResolver } from './resolvers/provincia-query.resolver';


// SERVICIOS
import { ProvinciaService } from './services/provincia.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    ClientProxyService,
    ProvinciaQueryResolver,
    ProvinciaService
  ],
  exports: [
    ClientProxyService,
    ClientProxyService,  
    ProvinciaQueryResolver,
    ProvinciaService
  ],
})
export class digitalizacionModule {}
