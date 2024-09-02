import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { VotosEntity } from '../entities/votos.entity';

type EntityFields = keyof VotosEntity;

@Injectable()
export class VotosRepository extends RepositoryOrmBase<VotosEntity> {
  protected entity: Constructable<VotosEntity> = VotosEntity;

  async updateVotosEscaneo(acta_id:number, data:any, queryRunner:any) {
    await queryRunner.query(
      `CALL actualizar_votos_escaneo(${acta_id}, ${data.candidato_id},${data.votosicr});`
    ); 
  }

  async updateVotosDigitalizacion(acta_id:number,candidato_id:number,votosdigitacion:number,usuarioId:number,queryRunner:any) {
   
    const dataCifrado :string = 'hasadasdsa3454resfsdfs34534hhh';
    await queryRunner.query(
      `CALL actualizar_votos_digitalizacion(${acta_id},${candidato_id},${votosdigitacion},
      '${dataCifrado}','${dataCifrado}',${usuarioId});`
    ); 
  }
}

