import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';

type EntityFields = keyof UsuarioEntity;

@Injectable()
export class UsuarioRepository extends RepositoryOrmBase<UsuarioEntity> {
  protected entity: Constructable<UsuarioEntity> = UsuarioEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<UsuarioEntity> => {
    const alias = 'usuario';
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