import { Injectable } from '@nestjs/common';
import { CollectionType, FilterById, changeFalseToTrue} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { ProvinciaManager } from '../manager/provincia.manager';
import { Provincia } from '../dto/provincia.dto';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de provincia
 *
 * @export
 * @class ProvinciaService
 * @typedef {ProvinciaService}
 */
@Injectable()
export class ProvinciaService {
  
  
  constructor(
      private readonly provinciaManager: ProvinciaManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
  ) {}

  /**
   * Función para obtener colección de provincia
   *
   * @async
   * @param {*} paginacion
   * @returns {Promise<CollectionType<Provincia>>}
   */
  async getCollection(paginacion: any): Promise<CollectionType<Provincia>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.provinciaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Provincia>, data);
  }

  /**
   * Función para obtener datos de provincia por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {Promise<Provincia>}
   */
  async findById(filter: FilterById): Promise<Provincia> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.provinciaManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
      },
      relations: fields.relations,
    });
    return plainToInstance(Provincia, data[0]);
  }
}