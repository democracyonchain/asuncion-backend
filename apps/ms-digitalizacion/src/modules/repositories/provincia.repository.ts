import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ProvinciaEntity } from '../entities/provincia.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof ProvinciaEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de provincia
 *
 * @export
 * @class ProvinciaRepository
 * @typedef {ProvinciaRepository}
 * @extends {RepositoryOrmBase<ProvinciaEntity>}
 */
@Injectable()
export class ProvinciaRepository extends RepositoryOrmBase<ProvinciaEntity> {
  protected entity: Constructable<ProvinciaEntity> = ProvinciaEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<ProvinciaEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ProvinciaEntity> => {
    const alias = 'provincia';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función que obtiene la data para la colección de provincia
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