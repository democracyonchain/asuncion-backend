import { ManagerBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ProvinciaRepository } from '../repositories/provincia.repository';
import { ProvinciaEntity } from '../entities/provincia.entity';


@Injectable()
export class ProvinciaManager extends ManagerBase<ProvinciaEntity, ProvinciaRepository> {
  constructor(private provinciaRepository: ProvinciaRepository) {
    super();
    this.repositoryEntity = provinciaRepository;
  }
}