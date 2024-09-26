import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ParroquiaEntity } from '../entities/parroquia.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof ParroquiaEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de parroquia
 *
 * @export
 * @class ParroquiaRepository
 * @typedef {ParroquiaRepository}
 * @extends {RepositoryOrmBase<ParroquiaEntity>}
 */
@Injectable()
export class ParroquiaRepository extends RepositoryOrmBase<ParroquiaEntity> {
  protected entity: Constructable<ParroquiaEntity> = ParroquiaEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<ParroquiaEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ParroquiaEntity> => {
    const alias = 'parroquia';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función que obtiene data para colección de parroquia
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('parroquia.canton', 'canton')
  }
}