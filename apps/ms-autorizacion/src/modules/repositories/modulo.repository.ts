import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ModuloEntity } from '../entities/modulo.entity';

type EntityFields = keyof ModuloEntity;

@Injectable()
export class ModuloRepository extends RepositoryOrmBase<ModuloEntity> {
  protected entity: Constructable<ModuloEntity> = ModuloEntity;
}