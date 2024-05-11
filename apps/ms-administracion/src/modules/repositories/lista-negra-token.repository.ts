import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ListaNegraTokenEntity } from '../entities/lista-negra-token.entity';

type EntityFields = keyof ListaNegraTokenEntity;

@Injectable()
export class ListaNegraTokenRepository extends RepositoryOrmBase<ListaNegraTokenEntity> {
  protected entity: Constructable<ListaNegraTokenEntity> = ListaNegraTokenEntity;
}