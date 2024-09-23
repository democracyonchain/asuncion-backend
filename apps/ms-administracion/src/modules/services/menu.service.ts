/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { Menu, MenuDTO } from '../dto/menu.dto';
import { MenuEntity } from '../entities/menu.entity';
import { MenuManager } from '../manager/menu.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { RpcException } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import * as moment from 'moment';
import { ConstantesAdministracion } from '../../common/constantes-administracion';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de menu
 *
 * @export
 * @class MenuService
 * @typedef {MenuService}
 */
@Injectable()
export class MenuService {
  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION);
  
  constructor(
      private readonly menuManager: MenuManager,
      private readonly auditLogManager: AuditLogManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly datasource: DataSource,
  ) {}

  async create(params:  PayloadData<MenuDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de crear el menú`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(MenuEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.user.id;
    const dataCreate = deleteNullArray(data);
    const result = await this.menuManager.insert(dataCreate);
    if(result){
      status =true;
      message = `El menú ${result.titulo} se ha creado correctamente`;
    }
    return { status, message };
  }

  async update(params:  PayloadData<MenuDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de actualizar el menú`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let  data = plainToInstance(MenuEntity, params.data) 
      data['usuariomodificacion_id'] = params.dataUser.user.id;
      const dataUpdate = deleteNullArray(data);
      const idUpdate = {'id':dataUpdate['id']};
      let entityToUpdate = await this.menuManager.findOneBy(idUpdate);
      const dataOld = plainToInstance(MenuDTO, entityToUpdate);
      const result = await this.menuManager.updateBasic(dataUpdate,entityToUpdate,queryRunner);
      if(result){
        if(dataUpdate['estado']){
          const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.permisos set estado=${dataUpdate['estado']},
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' 
          where menu_id=${result.id} and activo=${ConstantesAdministracion.CT_ACTIVO}`;
          await queryRunner.manager.query(queryBuild);
        }
        status =true;
        message = `El menú ${result.titulo} se ha actualizado correctamente`;
        await queryRunner.commitTransaction();
        if(this.isAudit){
          await this.auditLogManager.logEvent('Edición','Menú',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
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

  async delete(params:  PayloadData<MenuDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(MenuEntity, params.data) 
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
      let entityToUpdate = await this.menuManager.findOneBy(idUpdate);
      const dataOld = plainToInstance(MenuDTO, entityToUpdate);
      const result = await this.menuManager.updateBasic(dataUpdate,entityToUpdate,queryRunner);
      if(result){
        const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.permisos set activo=${ConstantesAdministracion.BORRADO_LOGICO},
        usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' 
        where menu_id=${result.id}`;
        await queryRunner.manager.query(queryBuild);
        status = true;
        message = `El menú ${result.titulo} ha sido eliminado`;
        await queryRunner.commitTransaction();
        if(this.isAudit){
          await this.auditLogManager.logEvent('Eliminación','Menú',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
      }
    }
    catch (error) {
      Logger.error(error);
      status = false;
      message = error.message;
    }
    return { status, message };
  }

  async getCollection(paginacion: any): Promise<CollectionType<Menu>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.menuManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Menu>, data);
  }

  async findById(filter: FilterById): Promise<Menu> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.menuManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
      },
      relations: fields.relations,
    });
    return plainToInstance(Menu, data[0]);
  }
}