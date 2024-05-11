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

@Injectable()
export class RolService {
  constructor(
      private readonly rolManager: RolManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
  ) { }

  async create(params:  PayloadData<RolDTO>): Promise<RolDTO> {
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
    return plainToInstance(RolDTO, result);
  }

  async update(params:  PayloadData<RolDTO>): Promise<RolDTO> {
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
    const result = await this.rolManager.update(dataUpdate);
    return plainToInstance(RolDTO, result);
  }

  async delete(params:  PayloadData<RolDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(RolEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['estado'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    try {
      const data = await this.rolManager.findByRelations({
        select:{permisos:true},
        where: {
          id: dataUpdate.id,
        },
        relations: ['permisos'],
      });
      if(data){
        data[0].permisos.map((element:any)=>{
          if(element.id){
            element['usuariomodificacion_id'] = params.dataUser.user.id;
            element['estado'] = false;
          }     
        })
        dataUpdate['permisos']=data[0].permisos;
      }
      const result = await this.rolManager.update(dataUpdate);
      if(result){
        status = true;
        message = `Datos eliminados`;
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