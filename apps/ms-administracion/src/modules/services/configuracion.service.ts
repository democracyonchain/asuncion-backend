import { Injectable } from '@nestjs/common';
import { CollectionType} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { ConfiguracionManager } from '../manager/configuracion.manager';
import { Configuracion } from '../dto/configuracion.dto';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de configuración
 *
 * @export
 * @class ConfiguracionService
 * @typedef {ConfiguracionService}
 */
@Injectable()
export class ConfiguracionService {
  
  constructor(
      private readonly configuracionManager: ConfiguracionManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
  ) {}

  async getCollection(paginacion: any): Promise<CollectionType<Configuracion>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.configuracionManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Configuracion>, data);
  }
}