import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ActaEntity } from '../entities/acta.entity';
import { SelectQueryBuilder } from 'typeorm';


type EntityFields = keyof ActaEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de acta
 *
 * @export
 * @class ActaRepository
 * @typedef {ActaRepository}
 * @extends {RepositoryOrmBase<ActaEntity>}
 */
@Injectable()
export class ActaRepository extends RepositoryOrmBase<ActaEntity> {
  protected entity: Constructable<ActaEntity> = ActaEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<ActaEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ActaEntity> => {
    const alias = 'acta';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función que permite devolver una acta de manera aleatoria y bloquearla
   *
   * @async
   * @param {number} usuarioId
   * @param {number} provinciaId
   * @param {number} dignidadId
   * @returns {unknown}
   */
  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId:number) {
    return await this.getRepository().query(
      `SELECT * FROM devolver_y_bloquear_acta_digitalizacion(${provinciaId},${usuarioId},${dignidadId});`
    );  
  }

  /**
   * Función que actualiza los datos del acta una vez que se haya escaneao
   *
   * @async
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateActaEscaneo(data: any, queryRunner: any) {
    await queryRunner.query(
      `CALL actualizar_acta_escaneo(${data.blancos}, ${data.id}, ${data.nulos}, ${data.sufragantes});`
    ); 
  }

  /**
   * Función que permite traer la información del acta para las colecciones
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('acta.dignidad', 'dignidad')
      .innerJoin('acta.junta', 'junta')
      .innerJoin('junta.canton', 'canton')
      .innerJoin('junta.parroquia', 'parroquia')
      .innerJoin('junta.provincia', 'provincia')
  }

  /**
   * Función que permite actualizar el acta para desbloquearle
   *
   * @async
   * @param {*} acta_id
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateLiberaActa(acta_id: any, queryRunner: any) {
    await queryRunner.query(
      `CALL liberar_acta(${acta_id});`
    ); 
  }
}

