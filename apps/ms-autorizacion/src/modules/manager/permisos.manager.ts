import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { PermisosEntity } from '../entities/permisos.entity';
import { PermisosRepository } from '../repositories/permisos.repository';


@Injectable()
export class PermisosManager extends ManagerBase<PermisosEntity, PermisosRepository> {
  constructor(private permisosRepository: PermisosRepository) {
    super();
    this.repositoryEntity = permisosRepository;
  }
}