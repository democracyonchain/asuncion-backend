import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ModuloEntity } from '../entities/modulo.entity';
import { ModuloRepository } from '../repositories/modulo.repository';


/**
 * Clase manager para gestión del entity de modulo
 *
 * @export
 * @class ModuloManager
 * @typedef {ModuloManager}
 * @extends {ManagerBase<ModuloEntity, ModuloRepository>}
 */
@Injectable()
export class ModuloManager extends ManagerBase<ModuloEntity, ModuloRepository> {
  constructor(private moduloRepository: ModuloRepository) {
    super();
    this.repositoryEntity = moduloRepository;
  }

  /**
   * Función para colección de modulo
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'modulo';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.moduloRepository.getCollection(dataReset);
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