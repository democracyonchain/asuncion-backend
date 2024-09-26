import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DignidadRepository } from '../repositories/dignidad.repository';
import { DignidadEntity } from '../entities/dignidad.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de dignidad
 *
 * @export
 * @class DignidadManager
 * @typedef {DignidadManager}
 * @extends {ManagerBase<DignidadEntity, DignidadRepository>}
 */
@Injectable()
export class DignidadManager extends ManagerBase<DignidadEntity, DignidadRepository> {
  constructor(private dignidadRepository: DignidadRepository) {
    super();
    this.repositoryEntity = dignidadRepository;
  }

  /**
   * Función para colección de dignidad
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'dignidad';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.dignidadRepository.getCollection(dataReset);
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