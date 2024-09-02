import { ManagerBase } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { VotosRepository } from '../repositories/votos.repository';
import { VotosEntity } from '../entities/votos.entity';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class VotosManager extends ManagerBase<VotosEntity, VotosRepository> {
  constructor(private votosRepository: VotosRepository) {
    super();
    this.repositoryEntity = votosRepository;
  }

  async updateVotosEscaneo(acta_id:number, data:any,queryRunner:any) {
    for await (const element of data){
        await this.votosRepository.updateVotosEscaneo(acta_id, element, queryRunner).catch(
            (error) => {
              throw new RpcException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
              });
            },
        );
    }
  }
  async updateVotosDigitalizacion(params:any,queryRunner:any) {
    const data = params.data;
    const user = params.dataUser.user;
    for await (const element of data.votos){
      await this.votosRepository.updateVotosDigitalizacion(data.acta_id,element.candidato_id,element.votosdigitacion,user.id,queryRunner).catch(
        (error) => {
          throw new RpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
        },
      );
    }   
  } 
}