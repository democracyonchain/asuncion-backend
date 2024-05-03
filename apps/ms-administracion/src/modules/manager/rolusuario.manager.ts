import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RolUsuarioRepository } from '../repositories/rol-usuario.repository';
import { RolUsuarioEntity } from '../entities/rol-usuario.entity';


@Injectable()
export class RolUsuarioManager extends ManagerBase<RolUsuarioEntity, RolUsuarioRepository> {
  constructor(private rolUsuarioRepository: RolUsuarioRepository) {
    super();
    this.repositoryEntity = rolUsuarioRepository;
  }
}