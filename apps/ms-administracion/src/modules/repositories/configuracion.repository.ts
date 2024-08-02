import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { ConfiguracionEntity } from '../entities/configuracion.entity';

type EntityFields = keyof ConfiguracionEntity;

@Injectable()
export class ConfiguracionRepository extends RepositoryOrmBase<ConfiguracionEntity> {
  protected entity: Constructable<ConfiguracionEntity> = ConfiguracionEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<ConfiguracionEntity> => {
    const alias = 'configuracion';
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