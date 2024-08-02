import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfiguracionEntity } from '../entities/configuracion.entity';
import { ConfiguracionRepository } from '../repositories/configuracion.repository';


@Injectable()
export class ConfiguracionManager extends ManagerBase<ConfiguracionEntity, ConfiguracionRepository> {
  constructor(private configuracionRepository: ConfiguracionRepository) {
    super();
    this.repositoryEntity = configuracionRepository;
  }

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