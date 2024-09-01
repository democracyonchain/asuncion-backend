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

  async updateVotosDigitalizacion(params:any) {
    const data = params.data;
    const user = params.dataUser.user;
    const dataCifrado :string = 'hasadasdsa3454resfsdfs34534hhh';
    await this.getRepository().query(
      `CALL actualizar_votos_digitalizacion(${data.acta_id},${data.candidato_id},${data.votosdigitacion},
      '${dataCifrado}','${dataCifrado}',${user.id});`
    ); 
  }
}

