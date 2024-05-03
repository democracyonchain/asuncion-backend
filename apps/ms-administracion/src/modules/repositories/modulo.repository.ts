import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { ModuloEntity } from '../entities/modulo.entity';

type EntityFields = keyof ModuloEntity;

@Injectable()
export class ModuloRepository extends RepositoryOrmBase<ModuloEntity> {
  protected entity: Constructable<ModuloEntity> = ModuloEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ModuloEntity> => {
    const alias = 'modulo';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
  }
}