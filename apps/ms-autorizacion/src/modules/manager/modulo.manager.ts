import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ModuloRepository } from '../repositories/modulo.repository';
import { ModuloEntity } from '../entities/modulo.entity';


/**
 * Clase manager para gestión del entity de modulo
 *
 * @export
 * @class ModuloManager
 * @typedef {ModuloManager}
 * @extends {ManagerBase<ModuloEntity, ModuloRepository>}
 */
@Injectable()
export class ModuloManager extends ManagerBase<ModuloEntity, ModuloRepository> {
  constructor(private moduloRepository: ModuloRepository) {
    super();
    this.repositoryEntity = moduloRepository;
  }
}