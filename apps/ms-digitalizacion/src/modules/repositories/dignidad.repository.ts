import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { DignidadEntity } from '../entities/dignidad.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof DignidadEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de dignidad
 *
 * @export
 * @class DignidadRepository
 * @typedef {DignidadRepository}
 * @extends {RepositoryOrmBase<DignidadEntity>}
 */
@Injectable()
export class DignidadRepository extends RepositoryOrmBase<DignidadEntity> {
  protected entity: Constructable<DignidadEntity> = DignidadEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<DignidadEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<DignidadEntity> => {
    const alias = 'dignidad';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función que obtiene data para colección de dignidad
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
  }
}