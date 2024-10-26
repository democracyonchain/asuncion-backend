import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { JuntaEntity } from '../entities/junta.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof JuntaEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de junta
 *
 * @export
 * @class JuntaRepository
 * @typedef {JuntaRepository}
 * @extends {RepositoryOrmBase<JuntaEntity>}
 */
@Injectable()
export class JuntaRepository extends RepositoryOrmBase<JuntaEntity> {
  protected entity: Constructable<JuntaEntity> = JuntaEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<JuntaEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<JuntaEntity> => {
    const alias = 'junta';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función que permite obtener data para colección de junta
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('junta.provincia', 'provincia')
      .innerJoin('junta.canton', 'canton')
      .innerJoin('junta.parroquia', 'parroquia')
  }
}