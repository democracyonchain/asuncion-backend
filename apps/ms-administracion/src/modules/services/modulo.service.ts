/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Modulo, ModuloDTO } from '../dto/modulo.dto';
import { ModuloEntity } from '../entities/modulo.entity';
import { ModuloManager } from '../manager/modulo.manager';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';
import { DataSource } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import * as moment from 'moment';

@Injectable()
export class ModuloService {

  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION);

  constructor(
      private readonly moduloManager: ModuloManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly auditLogManager: AuditLogManager,
      private readonly datasource: DataSource,
  ) { }

  async create(params:  PayloadData<ModuloDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de crear el modulo`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.user.id;
    const dataCreate = deleteNullArray(data);
    const result = await this.moduloManager.insert(dataCreate);
    if(result){
      status =true;
      message = `El modulo ${result.nombre} se ha creado correctamente`;
    }
    return { status, message };
  }

  async update(params:  PayloadData<ModuloDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de actualizar el modulo`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let  data = plainToInstance(ModuloEntity, params.data) 
      data['usuariomodificacion_id'] = params.dataUser.user.id;
      const dataUpdate = deleteNullArray(data);
      const idUpdate = {'id':dataUpdate['id']};
      let entityToUpdate = await this.moduloManager.findOneBy(idUpdate);
      const dataOld = plainToInstance(ModuloDTO, entityToUpdate);
      const result = await this.moduloManager.updateBasic(dataUpdate,entityToUpdate,queryRunner);
      if(result){
        const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.menu set estado=${dataUpdate['estado']},
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' 
          where modulo_id=${result.id} and activo=${ConstantesAdministracion.CT_ACTIVO}`;
          await queryRunner.manager.query(queryBuild);
        const queryBuildPermisos = `update ${ConstantesAdministracion.SCHEMA_BSC}.permisos set estado = ${dataUpdate['estado']} where menu_id in (select m.id from public.permisos p 
          inner join ${ConstantesAdministracion.SCHEMA_BSC}.menu m on p.menu_id = m.id 
          inner join ${ConstantesAdministracion.SCHEMA_BSC}.modulo mo on m.modulo_id = mo.id 
          where mo.id =${result.id} and p.activo=${ConstantesAdministracion.CT_ACTIVO} and m.activo=${ConstantesAdministracion.CT_ACTIVO})`
        await queryRunner.manager.query(queryBuildPermisos);  
        status =true;
        message = `El modulo ${result.nombre} se ha actualizado correctamente`;
        await queryRunner.commitTransaction();
        if(this.isAudit){
          await this.auditLogManager.logEvent('Edición','Modulo',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
      } 
    }catch (error) {
      Logger.error(error);
      await queryRunner.rollbackTransaction(); 
      throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message, 
        });
    }
    finally {
      await queryRunner.release();
    }
    return { status, message };
  }

  async delete(params:  PayloadData<ModuloDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['activo'] = ConstantesAdministracion.BORRADO_LOGICO;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const idUpdate = {'id':dataUpdate['id']};
      let entityToUpdate = await this.moduloManager.findOneBy(idUpdate);
      const dataOld = plainToInstance(ModuloDTO, entityToUpdate);
      const result = await this.moduloManager.updateBasic(dataUpdate,entityToUpdate,queryRunner);
      if(result){
        const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.menu set activo=${ConstantesAdministracion.BORRADO_LOGICO},
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' 
          where modulo_id=${result.id}`;
          await queryRunner.manager.query(queryBuild);
        const queryBuildPermisos = `update ${ConstantesAdministracion.SCHEMA_BSC}.permisos set activo = ${ConstantesAdministracion.BORRADO_LOGICO} where menu_id in (select m.id from public.permisos p 
          inner join ${ConstantesAdministracion.SCHEMA_BSC}.menu m on p.menu_id = m.id 
          inner join ${ConstantesAdministracion.SCHEMA_BSC}.modulo mo on m.modulo_id = mo.id 
          where mo.id =${result.id})`
        await queryRunner.manager.query(queryBuildPermisos);  
        status = true;
        message = `El modulo ${result.nombre} ha sido eliminado`;
        await queryRunner.commitTransaction();
        if(this.isAudit){
          await this.auditLogManager.logEvent('Eliminación','Modulo',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
      }
    }catch (error) {
      Logger.error(error);
      await queryRunner.rollbackTransaction(); 
      throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message, 
        });
    }
    finally {
      await queryRunner.release();
    }
    return { status, message };
  }

  async getCollection(paginacion: any): Promise<CollectionType<Modulo>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.moduloManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Modulo>, data);
  }

  async findById(filter: FilterById): Promise<Modulo> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.moduloManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
      },
      relations: fields.relations,
    });
    return plainToInstance(Modulo, data[0]);
  }
}