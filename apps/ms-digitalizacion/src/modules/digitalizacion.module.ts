import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Controladores */
import { LocalidadesController } from './controllers/localidades.controller';
import { ActaController } from './controllers/acta.controller';
import { DignidadController } from './controllers/dignidad.controller';
import { VotosController } from './controllers/votos.controller';

/* Servicio */
import { LocalidadesService } from './services/localidades.service';
import { ActaService } from './services/acta.service';
import { DignidadService } from './services/dignidad.service';
import { VotosService } from './services/votos.service';

/* Repositorio */
import { AuditLogRepository } from './repositories/audit/audit-log.repository';
import { ListaNegraTokenRepository } from './repositories/lista-negra-token.repository';
import { ProvinciaRepository } from './repositories/provincia.repository';
import { CantonRepository } from './repositories/canton.repository';
import { ParroquiaRepository } from './repositories/parroquia.repository';
import { ZonaRepository } from './repositories/zona.repository';
import { JuntaRepository } from './repositories/junta.repository';
import { ActaRepository } from './repositories/acta.repository';
import { DignidadRepository } from './repositories/dignidad.repository';
import { ImagenActaRepository } from './repositories/imagen-acta.repository';
import { ImagenSegmentoRepository } from './repositories/imagen-segmento.repository';
import { VotosRepository } from './repositories/votos.repository';


/* Entidades */
import { AuditLog } from './entities/audit/audit-log.entity';
import { ListaNegraTokenEntity } from './entities/lista-negra-token.entity';
import { ProvinciaEntity } from './entities/provincia.entity';
import { CantonEntity } from './entities/canton.entity';
import { ParroquiaEntity } from './entities/parroquia.entity';
import { PartidoEntity } from './entities/partido.entity';
import { DignidadEntity } from './entities/dignidad.entity';
import { ZonaEntity } from './entities/zona.entity';
import { JuntaEntity } from './entities/junta.entity';
import { CandidatoEntity } from './entities/candidato.entity';
import { VotosEntity } from './entities/votos.entity';
import { ActaEntity } from './entities/acta.entity';
import { ImagenActaEntity } from './entities/imagen-acta.entity';
import { ImagenSegmentoEntity } from './entities/imagen-segmento.entity';


/* Manager */
import { AuditLogManager } from './manager/audit/audit-log.manager';
import { ListaNegraTokenManager } from './manager/lista-negra-token.manager';
import { ProvinciaManager } from './manager/provincia.manager';
import { CantonManager } from './manager/canton.manager';
import { ParroquiaManager } from './manager/parroquia.manager';
import { ZonaManager } from './manager/zona.manager';
import { JuntaManager } from './manager/junta.manager';
import { ActaManager } from './manager/acta.manager';
import { DignidadManager } from './manager/dignidad.manager';
import { ImagenActaManager } from './manager/imagen-acta.manager';
import { ImagenSegmentoManager } from './manager/imagen-segmento.manager';
import { VotosManager } from './manager/votos.manager';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ListaNegraTokenEntity,
            ProvinciaEntity,
            CantonEntity,
            ParroquiaEntity,
            PartidoEntity,
            DignidadEntity,
            ZonaEntity,
            JuntaEntity,
            CandidatoEntity,
            VotosEntity,
            ActaEntity,
            ImagenActaEntity,
            ImagenSegmentoEntity
        ]),
        TypeOrmModule.forFeature([
            AuditLog
          ], "mongodb"),
    ],
    controllers: [
        LocalidadesController,
        ActaController,
        DignidadController,
        VotosController
    ],
    providers: [    
        AuditLogManager,
        AuditLogRepository,
        ListaNegraTokenRepository,
        ListaNegraTokenManager,
        ProvinciaRepository,
        ProvinciaManager,
        LocalidadesService,
        CantonRepository,
        CantonManager,
        ParroquiaRepository,
        ParroquiaManager,
        ZonaRepository,
        ZonaManager,
        JuntaRepository,
        JuntaManager,
        ActaService,
        ActaRepository,
        ActaManager,
        DignidadService,
        DignidadRepository,
        DignidadManager,
        ImagenActaRepository,
        ImagenActaManager,
        ImagenSegmentoRepository,
        ImagenSegmentoManager,
        VotosRepository,
        VotosManager,
        VotosService
    ],
    exports: [
        LocalidadesService,
        ActaService,
        DignidadService,
        VotosService
    ],
})
export class DigitalizacionModule { }
