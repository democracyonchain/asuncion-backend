import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ProvinciaRepository } from '../repositories/provincia.repository';
import { ProvinciaEntity } from '../entities/provincia.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de provincia
 *
 * @export
 * @class ProvinciaManager
 * @typedef {ProvinciaManager}
 * @extends {ManagerBase<ProvinciaEntity, ProvinciaRepository>}
 */
@Injectable()
export class ProvinciaManager extends ManagerBase<ProvinciaEntity, ProvinciaRepository> {
  constructor(private provinciaRepository: ProvinciaRepository) {
    super();
    this.repositoryEntity = provinciaRepository;
  }

  /**
   * Función para colección de provincia
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'provincia';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.provinciaRepository.getCollection(dataReset);
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