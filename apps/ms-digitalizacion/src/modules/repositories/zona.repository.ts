import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ZonaEntity } from '../entities/zona.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof ZonaEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de zona
 *
 * @export
 * @class ZonaRepository
 * @typedef {ZonaRepository}
 * @extends {RepositoryOrmBase<ZonaEntity>}
 */
@Injectable()
export class ZonaRepository extends RepositoryOrmBase<ZonaEntity> {
  protected entity: Constructable<ZonaEntity> = ZonaEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<ZonaEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ZonaEntity> => {
    const alias = 'zona';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función que obtiene los datos para la colección de zona
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('zona.parroquia', 'parroquia')
  }
}