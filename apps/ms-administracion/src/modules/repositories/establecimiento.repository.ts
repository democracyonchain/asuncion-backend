import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { EstablecimientoEntity } from '../entities/establecimiento.entity';

type EntityFields = keyof EstablecimientoEntity;

/**
 * Clase donde se realizan consultas mediante QueryBuilder o nativas para la entity de establecimiento
 *
 * @export
 * @class EstablecimientoRepository
 * @typedef {EstablecimientoRepository}
 * @extends {RepositoryOrmBase<EstablecimientoEntity>}
 */
@Injectable()
export class EstablecimientoRepository extends RepositoryOrmBase<EstablecimientoEntity> {
  protected entity: Constructable<EstablecimientoEntity> = EstablecimientoEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<EstablecimientoEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<EstablecimientoEntity> => {
    const alias = 'establecimiento';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    qb.where('establecimiento.activo= :activo', { activo: Number(ConstantesAdministracion.CT_ACTIVO) });
    return qb;
  };

  /**
   * Función para obtener la colección del entity establecimiento
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