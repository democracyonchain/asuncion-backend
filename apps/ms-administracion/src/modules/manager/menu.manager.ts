import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { MenuRepository } from '../repositories/menu.repository';
import { MenuEntity } from '../entities/menu.entity';


/**
 * Clase manager para gestión del entity de menu
 *
 * @export
 * @class MenuManager
 * @typedef {MenuManager}
 * @extends {ManagerBase<MenuEntity, MenuRepository>}
 */
@Injectable()
export class MenuManager extends ManagerBase<MenuEntity, MenuRepository> {
  constructor(private menuRepository: MenuRepository) {
    super();
    this.repositoryEntity = menuRepository;
  }

  /**
   * Función para colección de menu
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'menu';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.menuRepository.getCollection(dataReset);
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