import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { MenuRepository } from '../repositories/menu.repository';
import { MenuEntity } from '../entities/menu.entity';


@Injectable()
export class MenuManager extends ManagerBase<MenuEntity, MenuRepository> {
  constructor(private menuRepository: MenuRepository) {
    super();
    this.repositoryEntity = menuRepository;
  }

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