import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ZonaRepository } from '../repositories/zona.repository';
import { ZonaEntity } from '../entities/zona.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de zona
 *
 * @export
 * @class ZonaManager
 * @typedef {ZonaManager}
 * @extends {ManagerBase<ZonaEntity, ZonaRepository>}
 */
@Injectable()
export class ZonaManager extends ManagerBase<ZonaEntity, ZonaRepository> {
  constructor(private zonaRepository: ZonaRepository) {
    super();
    this.repositoryEntity = zonaRepository;
  }

  /**
   * Función para colección de zona
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'zona';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.zonaRepository.getCollection(dataReset);
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