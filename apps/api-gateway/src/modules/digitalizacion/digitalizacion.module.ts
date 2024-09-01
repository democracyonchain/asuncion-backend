import { Module } from '@nestjs/common';
import { ClientProxyService } from '../../config/client-proxy.service';

// RESOLVERS
import { LocalidadesQueryResolver } from './resolvers/localidades-query.resolver';
import { ActaQueryResolver } from './resolvers/acta-query.resolver';
import { DignidadQueryResolver } from './resolvers/dignidad-query.resolver';
import { VotosQueryResolver } from './resolvers/votos-query-resolver';


// SERVICIOS
import { LocalidadesService } from './services/localidades.service';
import { ActaService } from './services/acta.service';
import { DignidadService } from './services/dignidad.service';
import { VotosService } from './services/votos.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    ClientProxyService,
    LocalidadesQueryResolver,
    LocalidadesService,
    ActaQueryResolver,
    ActaService,
    DignidadQueryResolver,
    DignidadService,
    VotosQueryResolver,
    VotosService
  ],
  exports: [
    ClientProxyService,
    ClientProxyService,  
    LocalidadesQueryResolver,
    LocalidadesService,
    ActaQueryResolver,
    ActaService,
    DignidadQueryResolver,
    DignidadService,
    VotosQueryResolver,
    VotosService
  ],
})
export class digitalizacionModule {}
