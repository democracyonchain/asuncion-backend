/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Usuario, UsuarioDTO } from '../dto/usuario.dto';
import { UsuarioManager } from '../manager/usuario.manager';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import * as bcryptjs from "bcryptjs";
import { UsuarioEntity } from '../entities/usuario.entity';
import { RolUsuarioEntity } from '../entities/rol-usuario.entity';
import { DataSource } from 'typeorm';
import { RolUsuarioManager } from '../manager/rolusuario.manager';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import * as moment from 'moment';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';

@Injectable()
export class UsuarioService {
  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION)
  constructor(
      private readonly usuarioManager: UsuarioManager,
      private readonly rolUsuarioManager: RolUsuarioManager,
      private readonly datasource: DataSource,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly auditLogManager: AuditLogManager,
  ) { }


  async getCollection(paginacion: any): Promise<CollectionType<Usuario>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.usuarioManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Usuario>, data);
  }

  async findById(filter: FilterById): Promise<Usuario> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.usuarioManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
        rolusuario:{
          estado:ConstantesAdministracion.CT_ACTIVO,
          activo:ConstantesAdministracion.CT_ACTIVO
        }
      },
      relations: fields.relations,
    });
    return plainToInstance(Usuario, data[0]);
  }
  
  async create(params:  PayloadData<UsuarioDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de crear el usuario`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let  data = params.data
      let rolesPromise:any = null;
      const user = await this.usuarioManager.findOneBy({username:data.username,estado:true});
      if(user){
        throw new BadRequestException("El nombre de usuario ya existe");
      }
      else{
        data.password = await bcryptjs.hash(data.password, 10);
        data['usuariocreacion_id'] = params.dataUser.user.id;
        let  dataInsert = plainToInstance(UsuarioEntity, params.data) 
        const dataCreate = deleteNullArray(dataInsert);
        const result = await this.usuarioManager.insert(dataCreate, queryRunner);
        if(result){
          const roles = dataCreate.roles
          if(roles.length > 0){
            rolesPromise = await Promise.all(roles.map(async (element:any)=>{
              const dataRoles = new RolUsuarioEntity();
              dataRoles.usuariocreacion_id = params.dataUser.user.id;
              dataRoles.usuario_id = result.id;
              dataRoles.rol_id = element;
              await this.rolUsuarioManager.insert(dataRoles, queryRunner);
            }))
          }
          else{
            throw new RpcException({
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: `Para crear el usuario ${result.username} debe tener roles asignados`, 
            });
          }
          if(rolesPromise){
            await queryRunner.commitTransaction();
            if(result){
              status =true;
              message = `El usuario ${result.username} se ha creado correctamente`;
              return { status, message };
            }
          } 
        } 
      } 
    }
    catch (error) {
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
  }

  async update(params:  PayloadData<UsuarioDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de actualizar el usuario`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let roles_insert = [];
      let roles_delete = [];
      let roles_update = [];
      const roles_data_base_ids_true:any = [];
      const roles_data_base_ids_false:any = [];
      let  data = plainToInstance(UsuarioEntity, params.data) 
      data['usuariomodificacion_id'] = params.dataUser.user.id;
      if(data.password){
        data.password = await bcryptjs.hash(data.password, 10);
      }
      const dataUpdate = deleteNullArray(data);
      const roles = dataUpdate?.roles
      let entityToUpdate = await this.usuarioManager.findByRelations({
        where: { id:dataUpdate['id'] },
      });
      const dataOld = plainToInstance(UsuarioDTO, entityToUpdate[0]);
      const result = await this.usuarioManager.updateBasic(dataUpdate,entityToUpdate[0],queryRunner);
      if(roles?.length > 0){
        //data guarda
        const dataUsuarioRol = await this.rolUsuarioManager.findByRelations({
          select:{id:true,rol_id:true,estado:true},
          where: {
            usuario_id: dataUpdate.id,
            activo: true,
          },
        });
        if (dataUsuarioRol) {
          for await (const valorRemove of dataUsuarioRol) {
            if(valorRemove.estado){
              roles_data_base_ids_true.push(valorRemove.rol_id)
            }
            else{
              roles_data_base_ids_false.push(valorRemove.rol_id)
            }  
          }
        }
        roles_insert = roles.filter((x: RolUsuarioEntity) => roles_data_base_ids_true.indexOf(x) === -1);
        roles_delete = roles_data_base_ids_true.filter(x => roles.indexOf(x) === -1);
        roles_update = roles_data_base_ids_false.filter(x => roles_insert.indexOf(x) === -1);
        roles_update = roles_data_base_ids_false.filter(x => roles_update.indexOf(x) === -1);
        roles_insert = roles_insert.filter(x => roles_update.indexOf(x) === -1);

        //insertar
        await Promise.all(roles_insert.map(async (element:any)=>{
          const dataRoles = new RolUsuarioEntity();
          dataRoles.usuariocreacion_id = params.dataUser.user.id;
          dataRoles.usuario_id = result.id;
          dataRoles.rol_id = element;
          dataRoles.estado = true;
          await this.rolUsuarioManager.insert(dataRoles, queryRunner);
        }))
        //desactivar
        await Promise.all(roles_delete.map(async (element:any)=>{
          const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.rolusuario set estado=${ConstantesAdministracion.BORRADO_LOGICO},
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' where usuario_id=${result.id} and rol_id=${element}`;
          await queryRunner.manager.query(queryBuild);
        }))
        //Actualizar
        await Promise.all(roles_update.map(async (element:any)=>{
          const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.rolusuario set estado=${ConstantesAdministracion.CT_ACTIVO},
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' where usuario_id=${result.id} and rol_id=${element}`;
          await queryRunner.manager.query(queryBuild);
        }))
      }
      else{
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Para editar el usuario ${result.username} debe tener roles asignados`, 
        });
      }
      if(result){
        status =true;
        message = `El usuario ${result.username} se ha actualizado correctamente`;
        await queryRunner.commitTransaction();
        if(this.isAudit){
          dataUpdate['roles']=roles;
          dataOld['roles']=roles_data_base_ids_true;
          await this.auditLogManager.logEvent('Edición','Usuario',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
        return { status, message };
      }
    }
    catch (error) {
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
  }

  async delete(params:  PayloadData<UsuarioDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(UsuarioEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['activo'] = ConstantesAdministracion.BORRADO_LOGICO;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    const queryRunner = this.datasource.createQueryRunner();
    const roles_data_base_ids = [];
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let entityToUpdate = await this.usuarioManager.findByRelations({
        where: { id:dataUpdate['id'] },
      });
      const dataOld = plainToInstance(UsuarioDTO, entityToUpdate[0]);
      const result = await this.usuarioManager.updateBasic(dataUpdate,entityToUpdate[0],queryRunner);
      if(result){
        const dataUsuarioRol = await this.rolUsuarioManager.findByRelations({
          select:{id:true,rol_id:true},
          where: {
            usuario_id: dataUpdate.id,
          },
        });
        if (dataUsuarioRol) {
          for await (const valorRemove of dataUsuarioRol) {
            roles_data_base_ids.push(valorRemove.rol_id)
          }
        }
        await Promise.all(roles_data_base_ids.map(async (element:any)=>{
          const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.rolusuario set activo=${ConstantesAdministracion.BORRADO_LOGICO},
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' where usuario_id=${result.id} and rol_id=${element}`;
          await queryRunner.manager.query(queryBuild);
        }))
        await queryRunner.commitTransaction();
        status = true;
        message = `El usuario ${result.username} ha sido eliminado`;
        if(this.isAudit){
          await this.auditLogManager.logEvent('Eliminación','Usuario',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
        return { status, message };
      }
    }
    catch (error) {
      Logger.error(error);
      await queryRunner.rollbackTransaction(); 
      status = false;
      message = error.message;
    }
    finally {
      await queryRunner.release();
    } 
  }
}