import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ActaEntity } from '../entities/acta.entity';
import { SelectQueryBuilder } from 'typeorm';


type EntityFields = keyof ActaEntity;

@Injectable()
export class ActaRepository extends RepositoryOrmBase<ActaEntity> {
  protected entity: Constructable<ActaEntity> = ActaEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ActaEntity> => {
    const alias = 'acta';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId:number) {
    return await this.getRepository().query(
      `SELECT * FROM devolver_y_bloquear_acta_digitalizacion(${provinciaId},${usuarioId},${dignidadId});`
    );  
  }

  async updateActaEscaneo(data: any, queryRunner: any) {
    await queryRunner.query(
      `CALL actualizar_acta_escaneo(${data.blancos}, ${data.id}, ${data.nulos}, ${data.sufragantes});`
    ); 
  }

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('acta.dignidad', 'dignidad')
      .innerJoin('acta.junta', 'junta')
      .innerJoin('junta.canton', 'canton')
      .innerJoin('junta.parroquia', 'parroquia')
      .innerJoin('junta.provincia', 'provincia')
  }

  async updateLiberaActa(acta_id: any, queryRunner: any) {
    await queryRunner.query(
      `CALL liberar_acta(${acta_id});`
    ); 
  }
}

