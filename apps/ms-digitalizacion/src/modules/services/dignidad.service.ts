import { Injectable } from '@nestjs/common';
import { CollectionType } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { Dignidad } from '../dto/dignidad.dto';

import { DignidadManager } from '../manager/dignidad.manager';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de dignidad
 *
 * @export
 * @class DignidadService
 * @typedef {DignidadService}
 */
@Injectable()
export class DignidadService {
  
  
  constructor(
      private readonly dignidadManager: DignidadManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
  ) {}

  /**
   * Función para obtener la colección de dignidad
   *
   * @async
   * @param {*} paginacion
   * @returns {Promise<CollectionType<Dignidad>>}
   */
  async getCollectionDignidad(paginacion: any): Promise<CollectionType<Dignidad>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.dignidadManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Dignidad>, data);
  }
}