import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ParroquiaRepository } from '../repositories/parroquia.repository';
import { ParroquiaEntity } from '../entities/parroquia.entity';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class ParroquiaManager extends ManagerBase<ParroquiaEntity, ParroquiaRepository> {
  constructor(private parroquiaRepository: ParroquiaRepository) {
    super();
    this.repositoryEntity = parroquiaRepository;
  }

  async getCollection(paginacion:any) {
    const aliasEntity = 'parroquia';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.parroquiaRepository.getCollection(dataReset);
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