import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DignidadRepository } from '../repositories/dignidad.repository';
import { DignidadEntity } from '../entities/dignidad.entity';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class DignidadManager extends ManagerBase<DignidadEntity, DignidadRepository> {
  constructor(private dignidadRepository: DignidadRepository) {
    super();
    this.repositoryEntity = dignidadRepository;
  }

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