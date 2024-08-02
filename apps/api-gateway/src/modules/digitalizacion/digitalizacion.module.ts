import { Module } from '@nestjs/common';
import { ClientProxyService } from '../../config/client-proxy.service';

// RESOLVERS
import { LocalidadesQueryResolver } from './resolvers/localidades-query.resolver';
import { ActaQueryResolver } from './resolvers/acta-query.resolver';


// SERVICIOS
import { LocalidadesService } from './services/localidades.service';
import { ActaService } from './services/acta.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    ClientProxyService,
    LocalidadesQueryResolver,
    LocalidadesService,
    ActaQueryResolver,
    ActaService
  ],
  exports: [
    ClientProxyService,
    ClientProxyService,  
    LocalidadesQueryResolver,
    LocalidadesService,
    ActaQueryResolver,
    ActaService
  ],
})
export class digitalizacionModule {}
