import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ModuloRepository } from '../repositories/modulo.repository';
import { ModuloEntity } from '../entities/modulo.entity';


@Injectable()
export class ModuloManager extends ManagerBase<ModuloEntity, ModuloRepository> {
  constructor(private moduloRepository: ModuloRepository) {
    super();
    this.repositoryEntity = moduloRepository;
  }
}