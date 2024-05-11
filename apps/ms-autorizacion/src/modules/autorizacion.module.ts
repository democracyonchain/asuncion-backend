import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Controladores */

import { AutorizacionController } from './controllers/autorizacion.controller';

/* Servicio */
import { AutorizacionService } from './services/autorizacion.service';

/* Repositorio */
import { UsuarioRepository } from './repositories/usuario.respository';
import { RolUsuarioRepository } from './repositories/rol-usuario.repository';
import { PermisosRepository } from './repositories/permisos.repository';
import { ModuloRepository } from './repositories/modulo.repository';
import { ListaNegraTokenRepository } from './repositories/lista-negra-token.repository';

/* Entidades */
import { UsuarioEntity } from './entities/usuario.entity';
import { MenuEntity } from './entities/menu.entity';
import { ModuloEntity } from './entities/modulo.entity';
import { PermisosEntity } from './entities/permisos.entity';
import { RolUsuarioEntity } from './entities/rol-usuario.entity';
import { RolEntity } from './entities/rol.entity';
import { ListaNegraTokenEntity } from './entities/lista-negra-token.entity';

/* Manager */
import { UsuarioManager } from './manager/usuario.manager';
import { RolUsuarioManager } from './manager/rolusuario.manager';
import { PermisosManager } from './manager/permisos.manager';
import { ModuloManager } from './manager/modulo.manager';
import { ListaNegraTokenManager } from './manager/lista-negra-token.manager';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioEntity,
            MenuEntity,
            ModuloEntity,
            PermisosEntity,
            RolUsuarioEntity,
            RolEntity,
            ListaNegraTokenEntity
        ]),
    ],
    controllers: [
        AutorizacionController
    ],
    providers: [
        UsuarioRepository,
        UsuarioManager,
        AutorizacionService,
        RolUsuarioRepository,
        RolUsuarioManager,
        PermisosRepository,
        PermisosManager,
        ModuloRepository,
        ModuloManager,
        ListaNegraTokenRepository,
        ListaNegraTokenManager
    ],
    exports: [
        AutorizacionService
    ],
})
export class AutorizacionModule { }
