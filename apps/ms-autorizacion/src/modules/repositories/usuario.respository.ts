import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';

type EntityFields = keyof UsuarioEntity;

@Injectable()
export class UsuarioRepository extends RepositoryOrmBase<UsuarioEntity> {
  protected entity: Constructable<UsuarioEntity> = UsuarioEntity;
}