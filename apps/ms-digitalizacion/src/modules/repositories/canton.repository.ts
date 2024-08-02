import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { CantonEntity } from '../entities/canton.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof CantonEntity;

@Injectable()
export class CantonRepository extends RepositoryOrmBase<CantonEntity> {
  protected entity: Constructable<CantonEntity> = CantonEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<CantonEntity> => {
    const alias = 'canton';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('canton.provincia', 'provincia')
  }
}