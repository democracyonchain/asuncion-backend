import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { RolEntity } from '../entities/rol.entity';

type EntityFields = keyof RolEntity;

@Injectable()
export class RolRepository extends RepositoryOrmBase<RolEntity> {
  protected entity: Constructable<RolEntity> = RolEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<RolEntity> => {
    const alias = 'rol';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
      .innerJoinAndSelect('rol.permisos', 'permisos')
      .innerJoinAndSelect('permisos.menu', 'menu')
  }
}