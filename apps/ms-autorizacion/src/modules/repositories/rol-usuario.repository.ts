import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { RolUsuarioEntity } from '../entities/rol-usuario.entity';

type EntityFields = keyof RolUsuarioEntity;

/**
 * Clase donde se realizan consultas mediante QueryBuilder o nativas para la entity de rol-usuario
 *
 * @export
 * @class RolUsuarioRepository
 * @typedef {RolUsuarioRepository}
 * @extends {RepositoryOrmBase<RolUsuarioEntity>}
 */
@Injectable()
export class RolUsuarioRepository extends RepositoryOrmBase<RolUsuarioEntity> {
  protected entity: Constructable<RolUsuarioEntity> = RolUsuarioEntity;
}