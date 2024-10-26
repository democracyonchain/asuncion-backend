import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ListaNegraTokenEntity } from '../entities/lista-negra-token.entity';

type EntityFields = keyof ListaNegraTokenEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de listanegra
 *
 * @export
 * @class ListaNegraTokenRepository
 * @typedef {ListaNegraTokenRepository}
 * @extends {RepositoryOrmBase<ListaNegraTokenEntity>}
 */
@Injectable()
export class ListaNegraTokenRepository extends RepositoryOrmBase<ListaNegraTokenEntity> {
  protected entity: Constructable<ListaNegraTokenEntity> = ListaNegraTokenEntity;
}