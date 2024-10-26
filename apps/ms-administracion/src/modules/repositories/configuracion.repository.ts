import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { ConfiguracionEntity } from '../entities/configuracion.entity';

type EntityFields = keyof ConfiguracionEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de configuración
 *
 * @export
 * @class ConfiguracionRepository
 * @typedef {ConfiguracionRepository}
 * @extends {RepositoryOrmBase<ConfiguracionEntity>}
 */
@Injectable()
export class ConfiguracionRepository extends RepositoryOrmBase<ConfiguracionEntity> {
  protected entity: Constructable<ConfiguracionEntity> = ConfiguracionEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<ConfiguracionEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ConfiguracionEntity> => {
    const alias = 'configuracion';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  /**
   * Función para obtener la colección del entity configuración
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