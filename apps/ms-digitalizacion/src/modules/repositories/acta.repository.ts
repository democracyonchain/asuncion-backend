import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ActaEntity } from '../entities/acta.entity';


type EntityFields = keyof ActaEntity;

@Injectable()
export class ActaRepository extends RepositoryOrmBase<ActaEntity> {
  protected entity: Constructable<ActaEntity> = ActaEntity;

  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId:number) {
    return await this.getRepository().query(
      `SELECT * FROM devolver_y_actualizar_acta(${provinciaId},${usuarioId},${dignidadId});`
    );  
  }

  async updateActaEscaneo(data: any, queryRunner: any) {
    await queryRunner.query(
      `CALL actualizar_acta_escaneo(${data.blancos}, ${data.id}, ${data.nulos}, ${data.sufragantes});`
    ); 
  }
}

