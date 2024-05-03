import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PermisosEntity } from '../entities/permisos.entity';

type EntityFields = keyof PermisosEntity;

@Injectable()
export class PermisosRepository extends RepositoryOrmBase<PermisosEntity> {
  protected entity: Constructable<PermisosEntity> = PermisosEntity;
}