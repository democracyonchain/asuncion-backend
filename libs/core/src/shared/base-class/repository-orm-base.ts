import { DataSource } from 'typeorm';
import { Constructable } from '../interfaces/constructable';
import { InjectDataSource } from '@nestjs/typeorm';

export abstract class RepositoryOrmBase<ENTITY> {
  protected abstract readonly entity: Constructable<ENTITY>;


  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {
   
  }

  getDataSource() {
    return this.dataSource;
  }

  getRepository() {
    return this.getDataSource().getRepository(this.entity);
  }
}
