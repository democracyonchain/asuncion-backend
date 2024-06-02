import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ProvinciaEntity } from '../entities/provincia.entity';

type EntityFields = keyof ProvinciaEntity;

@Injectable()
export class ProvinciaRepository extends RepositoryOrmBase<ProvinciaEntity> {
  protected entity: Constructable<ProvinciaEntity> = ProvinciaEntity;
}