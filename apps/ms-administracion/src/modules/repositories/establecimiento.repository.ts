import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { EstablecimientoEntity } from '../entities/establecimiento.entity';

type EntityFields = keyof EstablecimientoEntity;

@Injectable()
export class EstablecimientoRepository extends RepositoryOrmBase<EstablecimientoEntity> {
  protected entity: Constructable<EstablecimientoEntity> = EstablecimientoEntity;

  getBuildQueryBuilder = (...select: EntityFields[]): SelectQueryBuilder<EstablecimientoEntity> => {
    const alias = 'establecimiento';
    const qb = this.getRepository().createQueryBuilder(alias);
    if (select) {
      qb.select(select.map(f => `${alias}.${f}`));
    }
    qb.where('establecimiento.activo= :activo', { activo: Number(ConstantesAdministracion.CT_ACTIVO) });
    return qb;
  };

  async getCollection(dataReset: any) {
    return this.getBuildQueryBuilder()
      .select(dataReset)
  }
}