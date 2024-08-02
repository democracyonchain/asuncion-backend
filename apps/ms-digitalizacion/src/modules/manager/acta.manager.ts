import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ActaRepository } from '../repositories/acta.repository';
import { ActaEntity } from '../entities/acta.entity';


@Injectable()
export class ActaManager extends ManagerBase<ActaEntity, ActaRepository> {
  constructor(private actaRepository: ActaRepository) {
    super();
    this.repositoryEntity = actaRepository;
  }
}