import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { PermisosEntity } from '../entities/permisos.entity';

type EntityFields = keyof PermisosEntity;

/**
 * Clase donde se realizan consultas mediante QueryBuilder o nativas para la entity de permisos
 *
 * @export
 * @class PermisosRepository
 * @typedef {PermisosRepository}
 * @extends {RepositoryOrmBase<PermisosEntity>}
 */
@Injectable()
export class PermisosRepository extends RepositoryOrmBase<PermisosEntity> {
  protected entity: Constructable<PermisosEntity> = PermisosEntity;
}