import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { CantonEntity } from '../entities/canton.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof CantonEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de canton
 *
 * @export
 * @class CantonRepository
 * @typedef {CantonRepository}
 * @extends {RepositoryOrmBase<CantonEntity>}
 */
@Injectable()
export class CantonRepository extends RepositoryOrmBase<CantonEntity> {
  protected entity: Constructable<CantonEntity> = CantonEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<CantonEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<CantonEntity> => {
    const alias = 'canton';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función para traer datos de colección de canton
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('canton.provincia', 'provincia')
  }
}