import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from '../entities/usuario.entity';

type EntityFields = keyof UsuarioEntity;

/**
 * Clase donde se realizan consultas mediante QueryBuilder o nativas para la entity de usuario
 *
 * @export
 * @class UsuarioRepository
 * @typedef {UsuarioRepository}
 * @extends {RepositoryOrmBase<UsuarioEntity>}
 */
@Injectable()
export class UsuarioRepository extends RepositoryOrmBase<UsuarioEntity> {
  protected entity: Constructable<UsuarioEntity> = UsuarioEntity;
}