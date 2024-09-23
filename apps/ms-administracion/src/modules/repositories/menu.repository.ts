import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { ConstantesAdministracion } from '../../common/constantes-administracion';

type EntityFields = keyof MenuEntity;

/**
 * Clase donde se realizan consultas mediante QueryBuilder o nativas para la entity de menu
 *
 * @export
 * @class MenuRepository
 * @typedef {MenuRepository}
 * @extends {RepositoryOrmBase<MenuEntity>}
 */
@Injectable()
export class MenuRepository extends RepositoryOrmBase<MenuEntity> {
  protected entity: Constructable<MenuEntity> = MenuEntity;

  /**
   * Consulta base de queryBuilder
   *
   * @param {...EntityFields[]} select
   * @returns {SelectQueryBuilder<MenuEntity>}
   */
  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<MenuEntity> => {
    const alias = 'menu';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    qb.where('menu.activo= :activo', { activo: Number(ConstantesAdministracion.CT_ACTIVO) });
    return qb;
  };

  /**
   * Función para obtener la colección del entity menu
   *
   * @async
   * @param {*} dataReset
   * @returns {unknown}
   */
  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('menu.modulo', 'modulo')
      .andWhere('modulo.activo= :activo', { activo: Number(ConstantesAdministracion.CT_ACTIVO) })
      .andWhere('modulo.estado= :activo', { activo: Number(ConstantesAdministracion.CT_ACTIVO) })
  }
}