import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CantonRepository } from '../repositories/canton.repository';
import { CantonEntity } from '../entities/canton.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de canton
 *
 * @export
 * @class CantonManager
 * @typedef {CantonManager}
 * @extends {ManagerBase<CantonEntity, CantonRepository>}
 */
@Injectable()
export class CantonManager extends ManagerBase<CantonEntity, CantonRepository> {
  constructor(private cantonRepository: CantonRepository) {
    super();
    this.repositoryEntity = cantonRepository;
  }

  /**
   * Función para colección de canton
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'canton';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.cantonRepository.getCollection(dataReset);
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