import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { RolUsuarioRepository } from '../repositories/rol-usuario.repository';
import { RolUsuarioEntity } from '../entities/rol-usuario.entity';


/**
 * Clase manager para gestión del entity de rolusuario
 *
 * @export
 * @class RolUsuarioManager
 * @typedef {RolUsuarioManager}
 * @extends {ManagerBase<RolUsuarioEntity, RolUsuarioRepository>}
 */
@Injectable()
export class RolUsuarioManager extends ManagerBase<RolUsuarioEntity, RolUsuarioRepository> {
  constructor(private rolUsuarioRepository: RolUsuarioRepository) {
    super();
    this.repositoryEntity = rolUsuarioRepository;
  }
}