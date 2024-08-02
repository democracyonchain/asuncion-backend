import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ParroquiaEntity } from '../entities/parroquia.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof ParroquiaEntity;

@Injectable()
export class ParroquiaRepository extends RepositoryOrmBase<ParroquiaEntity> {
  protected entity: Constructable<ParroquiaEntity> = ParroquiaEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ParroquiaEntity> => {
    const alias = 'parroquia';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('parroquia.canton', 'canton')
  }
}