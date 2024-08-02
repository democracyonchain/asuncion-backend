import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JuntaRepository } from '../repositories/junta.repository';
import { JuntaEntity } from '../entities/junta.entity';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class JuntaManager extends ManagerBase<JuntaEntity, JuntaRepository> {
  constructor(private juntaRepository: JuntaRepository) {
    super();
    this.repositoryEntity = juntaRepository;
  }

  async getCollection(paginacion:any) {
    const aliasEntity = 'junta';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.juntaRepository.getCollection(dataReset);
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