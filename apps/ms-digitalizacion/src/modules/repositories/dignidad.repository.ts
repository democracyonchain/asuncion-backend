import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { DignidadEntity } from '../entities/dignidad.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof DignidadEntity;

@Injectable()
export class DignidadRepository extends RepositoryOrmBase<DignidadEntity> {
  protected entity: Constructable<DignidadEntity> = DignidadEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<DignidadEntity> => {
    const alias = 'dignidad';
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