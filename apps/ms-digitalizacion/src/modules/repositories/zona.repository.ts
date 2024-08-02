import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ZonaEntity } from '../entities/zona.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof ZonaEntity;

@Injectable()
export class ZonaRepository extends RepositoryOrmBase<ZonaEntity> {
  protected entity: Constructable<ZonaEntity> = ZonaEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ZonaEntity> => {
    const alias = 'zona';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('zona.parroquia', 'parroquia')
  }
}