import { Module } from '@nestjs/common';
import { ClientProxyService } from '../../config/client-proxy.service';

// RESOLVERS


import { UsuarioQueryResolver } from './resolvers/usuario-query.resolver';
import { ModuloQueryResolver } from './resolvers/modulo-query.resolver';
import { MenuQueryResolver } from './resolvers/menu-query.resolver';
import { RolQueryResolver } from './resolvers/rol-query.resolver';


// SERVICIOS

import { UsuarioService } from './services/usuario.service';
import { ModuloService } from './services/modulo.service';
import { MenuService } from './services/menu.service';
import { RolService } from './services/rol.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    ClientProxyService,
    UsuarioQueryResolver,
    UsuarioService,
    ModuloQueryResolver,
    ModuloService,
    MenuQueryResolver,
    MenuService,
    RolQueryResolver,
    RolService
  ],
  exports: [
    ClientProxyService,
    ClientProxyService,  
    UsuarioQueryResolver,
    UsuarioService,
    ModuloQueryResolver,
    ModuloService,
    MenuQueryResolver,
    MenuService,
    RolQueryResolver,
    RolService
  ],
})
export class administracionModule {}
