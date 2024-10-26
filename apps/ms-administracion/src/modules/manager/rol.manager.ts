import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RolEntity } from '../entities/rol.entity';
import { RolRepository } from '../repositories/rol.repository';


/**
 * Clase manager para gestión del entity de rol
 *
 * @export
 * @class RolManager
 * @typedef {RolManager}
 * @extends {ManagerBase<RolEntity, RolRepository>}
 */
@Injectable()
export class RolManager extends ManagerBase<RolEntity, RolRepository> {
  constructor(private rolRepository: RolRepository) {
    super();
    this.repositoryEntity = rolRepository;
  }

  /**
   * Función para colección de rol
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'rol';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.rolRepository.getCollection(dataReset);
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