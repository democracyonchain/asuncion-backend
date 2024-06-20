import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ProvinciaEntity } from '../entities/provincia.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof ProvinciaEntity;

@Injectable()
export class ProvinciaRepository extends RepositoryOrmBase<ProvinciaEntity> {
  protected entity: Constructable<ProvinciaEntity> = ProvinciaEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ProvinciaEntity> => {
    const alias = 'provincia';
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