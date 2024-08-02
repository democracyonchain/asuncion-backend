import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ActaEntity } from '../entities/acta.entity';

type EntityFields = keyof ActaEntity;

@Injectable()
export class ActaRepository extends RepositoryOrmBase<ActaEntity> {
  protected entity: Constructable<ActaEntity> = ActaEntity;
}