import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Controladores */
import { ProvinciaController } from './controllers/provincia.controller';

/* Servicio */
import { ProvinciaService } from './services/provincia.service';

/* Repositorio */
import { AuditLogRepository } from './repositories/audit/audit-log.repository';
import { ListaNegraTokenRepository } from './repositories/lista-negra-token.repository';
import { ProvinciaRepository } from './repositories/provincia.repository';


/* Entidades */
import { AuditLog } from './entities/audit/audit-log.entity';
import { ListaNegraTokenEntity } from './entities/lista-negra-token.entity';
import { ProvinciaEntity } from './entities/provincia.entity';


/* Manager */
import { AuditLogManager } from './manager/audit/audit-log.manager';
import { ListaNegraTokenManager } from './manager/lista-negra-token.manager';
import { ProvinciaManager } from './manager/provincia.manager';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ListaNegraTokenEntity,
            ProvinciaEntity,
        ]),
        TypeOrmModule.forFeature([
            AuditLog
          ], "mongodb"),
    ],
    controllers: [
        ProvinciaController
    ],
    providers: [    
        AuditLogManager,
        AuditLogRepository,
        ListaNegraTokenRepository,
        ListaNegraTokenManager,
        ProvinciaRepository,
        ProvinciaManager,
        ProvinciaService
    ],
    exports: [
        ProvinciaService
    ],
})
export class DigitalizacionModule { }
