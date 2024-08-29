import { ManagerBase } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ActaRepository } from '../repositories/acta.repository';
import { ActaEntity } from '../entities/acta.entity';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class ActaManager extends ManagerBase<ActaEntity, ActaRepository> {
  constructor(private actaRepository: ActaRepository) {
    super();
    this.repositoryEntity = actaRepository;
  }

  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId:number) {
    const data = await this.actaRepository.actaAleatoria(usuarioId, provinciaId, dignidadId).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
    return data;
  }

  async updateActaEscaneo(data:any,queryRunner:any) {
    await this.actaRepository.updateActaEscaneo(data, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }

}