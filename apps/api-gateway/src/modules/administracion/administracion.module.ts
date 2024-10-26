import { Module } from '@nestjs/common';
import { ClientProxyService } from '../../config/client-proxy.service';

// RESOLVERS


import { UsuarioQueryResolver } from './resolvers/usuario-query.resolver';
import { ModuloQueryResolver } from './resolvers/modulo-query.resolver';
import { MenuQueryResolver } from './resolvers/menu-query.resolver';
import { RolQueryResolver } from './resolvers/rol-query.resolver';
import { EstablecimientoQueryResolver } from './resolvers/establecimiento-query.resolver';
import { ProvinciaQueryResolver } from './resolvers/provincia-query.resolver';
import { ConfiguracionQueryResolver } from './resolvers/configuracion-query.resolver';


// SERVICIOS

import { UsuarioService } from './services/usuario.service';
import { ModuloService } from './services/modulo.service';
import { MenuService } from './services/menu.service';
import { RolService } from './services/rol.service';
import { EstablecimientoService } from './services/establecimiento.service';
import { ProvinciaService } from './services/provincia.service';
import { ConfiguracionService } from './services/configuracion.service';


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
    RolService,
    EstablecimientoQueryResolver,
    EstablecimientoService,
    ProvinciaQueryResolver,
    ProvinciaService,
    ConfiguracionQueryResolver,
    ConfiguracionService
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
    RolService,
    EstablecimientoQueryResolver,
    EstablecimientoService,
    ProvinciaQueryResolver,
    ProvinciaService,
    ConfiguracionQueryResolver,
    ConfiguracionService
  ],
})
export class administracionModule {}
