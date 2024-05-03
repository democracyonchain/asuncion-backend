import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { RolUsuarioEntity } from '../entities/rol-usuario.entity';

type EntityFields = keyof RolUsuarioEntity;

@Injectable()
export class RolUsuarioRepository extends RepositoryOrmBase<RolUsuarioEntity> {
  protected entity: Constructable<RolUsuarioEntity> = RolUsuarioEntity;
}