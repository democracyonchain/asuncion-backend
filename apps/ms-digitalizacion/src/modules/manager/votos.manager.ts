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
  async updateVotosDigitalizacion(params:any,queryRunner:any,encryptionService:any) {
    const data = params.data;
    const user = params.dataUser.user;
    let aux = 0;
    for await (const element of data.votos){
      const dataCifrado = element.cifrado
      delete element.cifrado
      const decryptBack = encryptionService.decrypt(dataCifrado);
      if(decryptBack === JSON.stringify(element)){
        await this.votosRepository.updateVotosDigitalizacion(data.acta_id,element.candidato_id,element.votosdigitacion,user.id,dataCifrado,queryRunner).catch(
          (error) => {
            throw new RpcException({
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          },
        );
      }
      else{
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Existe un problema de cifrado con el registro de voto ${aux}`,
        });
      }
      aux++
    }   
  } 
}