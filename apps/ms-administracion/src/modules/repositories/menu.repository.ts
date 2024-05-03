import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';

type EntityFields = keyof MenuEntity;

@Injectable()
export class MenuRepository extends RepositoryOrmBase<MenuEntity> {
  protected entity: Constructable<MenuEntity> = MenuEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<MenuEntity> => {
    const alias = 'menu';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('menu.modulo', 'modulo')
  }
}