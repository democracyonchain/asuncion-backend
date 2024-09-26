import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ModuloEntity } from '../entities/modulo.entity';

type EntityFields = keyof ModuloEntity;

/**
 * Clase donde se realizan consultas mediante QueryBuilder o nativas para la entity de modulo
 *
 * @export
 * @class ModuloRepository
 * @typedef {ModuloRepository}
 * @extends {RepositoryOrmBase<ModuloEntity>}
 */
@Injectable()
export class ModuloRepository extends RepositoryOrmBase<ModuloEntity> {
  protected entity: Constructable<ModuloEntity> = ModuloEntity;
}