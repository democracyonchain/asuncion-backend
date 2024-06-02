import { RepositoryOrmBase } from './repository-orm-base';
import { HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Repository, FindOptionsWhere, DeleteResult, DataSource, EntityManager, QueryRunner, FindOneOptions, EntityTarget, getMetadataArgsStorage } from 'typeorm';


export abstract class ManagerBase<ENTITY, REPOSITORY extends RepositoryOrmBase<ENTITY>> {
  protected repositoryEntity: REPOSITORY;
  private queryRunner: QueryRunner;

  protected getRepository = (): Repository<ENTITY> => {
    return this.repositoryEntity.getRepository();
  };

  protected getDataSource = (): DataSource => {
     return this.repositoryEntity.getDataSource();
   
  };

  protected getEntityManager = (): EntityManager => {
    return this.repositoryEntity.getDataSource().manager;
 
  };

  async beginTransaction  ()  {
    const qr = this.getDataSource().createQueryRunner();
    await  qr.connect();
    await qr.startTransaction();
    this.queryRunner = qr
    return this.queryRunner
  };

  async commit  ()  {
    await this.queryRunner.commitTransaction();
  };

  async rollback  () {
    await this.queryRunner.rollbackTransaction();
  };

  async release   ()  {
    await this.queryRunner.release();
    this.queryRunner = null;
  };


  withTransaction  (queryRunner:QueryRunner) {
    this.queryRunner = queryRunner;
  }

  async findBy   (criteria: FindOptionsWhere<ENTITY>): Promise<ENTITY[]> {
    try {
      return await this.getRepository().find({ where: criteria });
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la búsqueda de la información`,error,
      });
      
    }
  };

  async findOneBy(criteria: FindOptionsWhere<ENTITY>): Promise<ENTITY> {
    try {
      const result = await this.getRepository().findOneBy(criteria);
      return result;
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message:`A ocurrido un error interno en la búsqueda de la información`,error,
      });
      

    }
  };

  async exist  (criteria: FindOptionsWhere<ENTITY>): Promise<boolean>  {
    try {
      return await this.getRepository().exist(criteria);
    } catch (error) {
      Logger.error(error);
       throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message:`A ocurrido un error interno la información no existe`,error,
      });
    }
  };



   async insert (entity: ENTITY,queryRunner?:QueryRunner): Promise<ENTITY> {
    
    try {
        this.queryRunner = queryRunner;
        const model = this.getRepository().create(entity);
        if(this.queryRunner){
        return await this.queryRunner.manager.save(model);
      }
      else{
        return await this.getRepository().save(model);
      }
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message:`A ocurrido un error interno en la creación del recurso`,error,
      });
      
    }
  };



  async update (entity: ENTITY,queryRunner?:QueryRunner): Promise<ENTITY>  {

    try {
      this.queryRunner = queryRunner;
      const idUpdate = {'id':entity['id']};
      const entityToUpdate = await this.getRepository().findOneBy(idUpdate);
      const entityMerge = await this.getRepository().merge(entityToUpdate,entity);
      if(this.queryRunner){
        return await this.queryRunner.manager.save(entityMerge);
      }
      else{
        return await this.getRepository().save(entityMerge);
      }
    } catch (error) {
      Logger.error(error);
        throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la actualización del recurso`,error,
      });
    
    }
  };

  async delete  (id: any, queryRunner?:QueryRunner): Promise<DeleteResult>  {
    try {
      this.queryRunner = queryRunner;
      if(this.queryRunner){
        return await this.getRepository().delete({ id });
      }
      else{
        return await this.getRepository().delete({ id });
      }
      
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la eliminación del recurso`,error,
      });
      
    }
  };

  async remove (entity: ENTITY,queryRunner?:QueryRunner): Promise<ENTITY> {
    try {
  
      this.queryRunner = queryRunner;
      if(this.queryRunner){
        return await this.queryRunner.manager.remove(entity);
      }
      else{
        return await this.getRepository().remove(entity);
      }
      
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la eliminación del recurso`,error,
      });
    
    }
  };



 async findOne  (params:  FindOneOptions<ENTITY>): Promise<ENTITY>  {
    try {
      const result = await this.getRepository().findOne(params);
      return result;
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la búsqueda de la información`,
      });
         
    }
  };

  async findByRelations  (criteria: FindOneOptions<ENTITY>): Promise<ENTITY[]> {
    try {
      return await this.getRepository().find(criteria);
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la búsqueda de la información`,
      });
    }
  };

  async insertMongo (entity: ENTITY,repository:any): Promise<ENTITY> {
    try {
       return await repository.save(entity);
    } catch (error) {
      Logger.error(error);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message:`A ocurrido un error interno en la creación del recurso`,error,
      });
      
    }
  };

  async updateBasic (entity: ENTITY,entityToUpdate?:any,queryRunner?:QueryRunner,): Promise<ENTITY>  {

    try {
      this.queryRunner = queryRunner;
      const entityMerge = await this.getRepository().merge(entityToUpdate,entity)
      if(this.queryRunner){
        return await this.queryRunner.manager.save(entityMerge);
      }
      else{
        return await this.getRepository().save(entityMerge);
      }
    } catch (error) {
      Logger.error(error);
        throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `A ocurrido un error interno en la actualización del recurso`,error,
      }); 
    }
  };

  async calculateChanges<T>(entityClass: EntityTarget<T>, entityId: any, entityManager:any): Promise<void> {
    const metadata = getMetadataArgsStorage();

    // Cargar la entidad desde la base de datos
    const entity = await entityManager.findOne(entityClass, entityId);

    if (entity) {
      // Calcular los cambios en la entidad
      const changeSet = entityManager.getUnitOfWork().computeChangeSet(entity);

      // Acceder a los cambios
      console.log(changeSet);

      // Realizar otras operaciones según sea necesario
    }
  }
}
