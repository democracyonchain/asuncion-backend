/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class UsuarioService {
  constructor(
      private readonly usuarioManager: UsuarioManager,
      private readonly rolUsuarioManager: RolUsuarioManager,
      private readonly datasource: DataSource,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
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
      },
      relations: fields.relations,
    });
    return plainToInstance(Usuario, data[0]);
  }
  
  async create(params:  PayloadData<UsuarioDTO>): Promise<UsuarioDTO> {
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
          if(rolesPromise){
            await queryRunner.commitTransaction();
            return plainToInstance(UsuarioDTO, result);
          } 
        } 
      } 
    }
    catch (error) {
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

  async update(params:  PayloadData<UsuarioDTO>): Promise<UsuarioDTO> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let roles_insert = [];
      let roles_delete = [];
      const roles_data_base_ids = [];
      let  data = plainToInstance(UsuarioEntity, params.data) 
      data['usuariomodificacion_id'] = params.dataUser.user.id;
      if(data.password){
        data.password = await bcryptjs.hash(data.password, 10);
      }
      const dataUpdate = deleteNullArray(data);
      const roles = dataUpdate?.roles
      const result = await this.usuarioManager.update(dataUpdate,queryRunner);
      if(roles?.length > 0){
        //data guarda
        const dataUsuarioRol = await this.rolUsuarioManager.findByRelations({
          select:{id:true,rol_id:true},
          where: {
            usuario_id: dataUpdate.id,
            estado: true,
          },
        });
        if (dataUsuarioRol) {
          for await (const valorRemove of dataUsuarioRol) {
            roles_data_base_ids.push(valorRemove.rol_id)
          }
        }
        roles_insert = roles.filter((x: RolUsuarioEntity) => roles_data_base_ids.indexOf(x) === -1);
        roles_delete = roles_data_base_ids.filter(x => roles.indexOf(x) === -1);
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
          const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.rolusuario set estado=false,
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' where usuario_id=${result.id} and rol_id=${element}`;
          await queryRunner.manager.query(queryBuild);
        }))
      }
      
      await queryRunner.commitTransaction();
      return plainToInstance(UsuarioDTO, result);
    }
    catch (error) {
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
    data['estado'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    const queryRunner = this.datasource.createQueryRunner();
    const roles_data_base_ids = [];
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.usuarioManager.update(dataUpdate);
      if(result){
        const dataUsuarioRol = await this.rolUsuarioManager.findByRelations({
          select:{id:true,rol_id:true},
          where: {
            usuario_id: dataUpdate.id,
            estado: true,
          },
        });
        if (dataUsuarioRol) {
          for await (const valorRemove of dataUsuarioRol) {
            roles_data_base_ids.push(valorRemove.rol_id)
          }
        }
        await Promise.all(roles_data_base_ids.map(async (element:any)=>{
          const queryBuild = `UPDATE ${ConstantesAdministracion.SCHEMA_BSC}.rolusuario set estado=false,
          usuariomodificacion_id='${params.dataUser.user.id}', fechamodificacion='${ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' where usuario_id=${result.id} and rol_id=${element}`;
          await queryRunner.manager.query(queryBuild);
        }))
        await queryRunner.commitTransaction();
        status = true;
        message = `Datos eliminados`;
        return { status, message };
      }
    }
    catch (error) {
      await queryRunner.rollbackTransaction(); 
      status = false;
      message = error.message;
    }
    finally {
      await queryRunner.release();
    } 
  }
}