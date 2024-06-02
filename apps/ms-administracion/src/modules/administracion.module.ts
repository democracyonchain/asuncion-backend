import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Controladores */
import { UsuarioController } from './controllers/usuario.controller';
import { ModuloController } from './controllers/modulo.controller';
import { MenuController } from './controllers/menu.controller';
import { RolController } from './controllers/rol.controller';

/* Servicio */
import { UsuarioService } from './services/usuario.service';
import { ModuloService } from './services/modulo.service';
import { MenuService } from './services/menu.service';
import { RolService } from './services/rol.service';

/* Repositorio */
import { UsuarioRepository } from './repositories/usuario.repository';
import { ModuloRepository } from './repositories/modulo.repository';
import { MenuRepository } from './repositories/menu.repository';
import { RolRepository } from './repositories/rol.repository';
import { RolUsuarioRepository } from './repositories/rol-usuario.repository';
import { AuditLogRepository } from './repositories/audit/audit-log.repository';
import { ListaNegraTokenRepository } from './repositories/lista-negra-token.repository';
import { ProvinciaRepository } from './repositories/provincia.repository';

/* Entidades */
import { UsuarioEntity } from './entities/usuario.entity';
import { ModuloEntity } from './entities/modulo.entity';
import { MenuEntity } from './entities/menu.entity';
import { RolEntity } from './entities/rol.entity';
import { PermisosEntity } from './entities/permisos.entity';
import { RolUsuarioEntity } from './entities/rol-usuario.entity';
import { AuditLog } from './entities/audit/audit-log.entity';
import { ListaNegraTokenEntity } from './entities/lista-negra-token.entity';
import { ProvinciaEntity } from './entities/provincia.entity';

/* Manager */
import { UsuarioManager } from './manager/usuario.manager';
import { ModuloManager } from './manager/modulo.manager';
import { MenuManager } from './manager/menu.manager';
import { RolManager } from './manager/rol.manager';
import { RolUsuarioManager } from './manager/rolusuario.manager';
import { AuditLogManager } from './manager/audit/audit-log.manager';
import { ListaNegraTokenManager } from './manager/lista-negra-token.manager';
import { ProvinciaManager } from './manager/provincia.manager';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioEntity,
            ModuloEntity,
            MenuEntity,
            RolEntity,
            PermisosEntity,
            RolUsuarioEntity,
            ListaNegraTokenEntity,
            ProvinciaEntity
        ]),
        TypeOrmModule.forFeature([
            AuditLog
          ], "mongodb"),
    ],
    controllers: [
        UsuarioController,
        ModuloController,
        MenuController,
        RolController
    ],
    providers: [
        UsuarioService,
        UsuarioRepository,
        UsuarioManager,
        ModuloService,
        ModuloRepository,
        ModuloManager,
        MenuService,
        MenuRepository,
        MenuManager,
        RolService,
        RolRepository,
        RolManager,
        RolUsuarioRepository,
        RolUsuarioManager,
        AuditLogManager,
        AuditLogRepository,
        ListaNegraTokenRepository,
        ListaNegraTokenManager,
        ProvinciaRepository,
        ProvinciaManager
    ],
    exports: [
        UsuarioService,
        ModuloService,
        MenuService,
        RolService
    ],
})
export class AdministracionModule { }
