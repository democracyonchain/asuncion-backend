import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { JuntaEntity } from '../entities/junta.entity';
import { SelectQueryBuilder } from 'typeorm';

type EntityFields = keyof JuntaEntity;

@Injectable()
export class JuntaRepository extends RepositoryOrmBase<JuntaEntity> {
  protected entity: Constructable<JuntaEntity> = JuntaEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<JuntaEntity> => {
    const alias = 'junta';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoin('junta.provincia', 'provincia')
      .innerJoin('junta.canton', 'canton')
      .innerJoin('junta.parroquia', 'parroquia')
  }
}