import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EstablecimientoEntity } from '../entities/establecimiento.entity';
import { EstablecimientoRepository } from '../repositories/establecimiento.repository';


@Injectable()
export class EstablecimientoManager extends ManagerBase<EstablecimientoEntity, EstablecimientoRepository> {
  constructor(private establecimientoRepository: EstablecimientoRepository) {
    super();
    this.repositoryEntity = establecimientoRepository;
  }

  async getCollection(paginacion:any) {
    const aliasEntity = 'establecimiento';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.establecimientoRepository.getCollection(dataReset);
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