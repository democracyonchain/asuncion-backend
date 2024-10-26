import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfiguracionEntity } from '../entities/configuracion.entity';
import { ConfiguracionRepository } from '../repositories/configuracion.repository';


/**
 * Clase manager para gestión del entity de configuración
 *
 * @export
 * @class ConfiguracionManager
 * @typedef {ConfiguracionManager}
 * @extends {ManagerBase<ConfiguracionEntity, ConfiguracionRepository>}
 */
@Injectable()
export class ConfiguracionManager extends ManagerBase<ConfiguracionEntity, ConfiguracionRepository> {
  constructor(private configuracionRepository: ConfiguracionRepository) {
    super();
    this.repositoryEntity = configuracionRepository;
  }

  /**
   * Función para colección de configuración
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'configuracion';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity); 
    const qb = await this.configuracionRepository.getCollection(dataReset);
    const data = await managePaginationArgs(aliasEntity, qb, paginacion).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
    return data;
  }
}