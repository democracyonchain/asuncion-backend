import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from '../entities/usuario.entity';
import { UsuarioRepository } from '../repositories/usuario.respository';


/**
 * Clase manager para gestión del entity de listanegra
 *
 * @export
 * @class UsuarioManager
 * @typedef {UsuarioManager}
 * @extends {ManagerBase<UsuarioEntity, UsuarioRepository>}
 */
@Injectable()
export class UsuarioManager extends ManagerBase<UsuarioEntity, UsuarioRepository> {
  constructor(private usuarioRepository: UsuarioRepository) {
    super();
    this.repositoryEntity = usuarioRepository;
  }
}