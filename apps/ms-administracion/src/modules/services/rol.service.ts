/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { Injectable } from '@nestjs/common';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { RolManager } from '../manager/rol.manager';
import { Rol, RolDTO } from '../dto/rol.dto';
import { RolEntity } from '../entities/rol.entity';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';

@Injectable()
export class RolService {

  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION)
  constructor(
      private readonly rolManager: RolManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly auditLogManager: AuditLogManager,
  ) { }

  async create(params:  PayloadData<RolDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de crear el rol`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(RolEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.user.id;
    const dataCreate = deleteNullArray(data);
    if(dataCreate.permisos){
      dataCreate.permisos.map((element:any)=>{
        element['usuariocreacion_id'] = params.dataUser.user.id;
      })
    }
    const result = await this.rolManager.insert(dataCreate);
    if(result){
      status =true;
      message = `El rol ${result.nombre} se ha creado correctamente`;
    }
    return { status, message };
  }

  async update(params:  PayloadData<RolDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de actualizar el rol`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(RolEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    const dataUpdate = deleteNullArray(data);
    if(dataUpdate.permisos){
      dataUpdate.permisos.map((element:any)=>{
        if(element.id){
          element['usuariomodificacion_id'] = params.dataUser.user.id;
        }
        else{
          element['usuariocreacion_id'] = params.dataUser.user.id;
        }  
      })
    }
    let entityToUpdate = await this.rolManager.findByRelations({
      where: { id:dataUpdate['id'] },
      relations: ['permisos']
    });
    const dataOld = plainToInstance(RolDTO, entityToUpdate[0]);
    delete entityToUpdate[0]['permisos']
    const result = await this.rolManager.updateBasic(dataUpdate,entityToUpdate[0]);
    if(result){
      status =true;
      message = `El rol ${result.nombre} se ha actualizado correctamente`;
      if(this.isAudit){
        await this.auditLogManager.logEvent('Edición','Rol',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
      }
    }
    return { status, message };
  }

  async delete(params:  PayloadData<RolDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(RolEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['activo'] = false;
    data['estado'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    try {
      const data = await this.rolManager.findByRelations({
        select:{id:true,estado:true,permisos:true},
        where: {
          id: dataUpdate.id,
        },
        relations: ['permisos','rolusuario'],
      });
      const dataOld = plainToInstance(RolDTO, data[0]);
      if(data[0]){
        data[0].permisos.map((element:any)=>{
          if(element.id){
            element['usuariomodificacion_id'] = params.dataUser.user.id;
            element['activo'] = false;
            element['estado'] = false;
          }     
        })
        dataUpdate['permisos']=data[0].permisos;
        data[0].rolusuario.map((element:any)=>{
          if(element.id){
            element['usuariomodificacion_id'] = params.dataUser.user.id;
            element['activo'] = false;
            element['estado'] = false;
          }     
        })
        dataUpdate['rolusuario']=data[0].rolusuario;
      }
      const result = await this.rolManager.update(dataUpdate);
      if(result){
        status = true;
        message = `El rol ${result.nombre} ha sido eliminado`;
        if(this.isAudit){
          await this.auditLogManager.logEvent('Eliminación','Rol',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
      }
    }
    catch (error) {
      status = false;
      message = error.message;
    }
    return { status, message };
  }

  async getCollection(paginacion: any): Promise<CollectionType<Rol>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.rolManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Rol>, data);
  }

  async findById(filter: FilterById): Promise<Rol> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.rolManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
      },
      relations: fields.relations,
    });
    return plainToInstance(Rol, data[0]);
  }
}