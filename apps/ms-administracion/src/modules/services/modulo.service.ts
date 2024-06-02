/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { Injectable } from '@nestjs/common';
import { Modulo, ModuloDTO } from '../dto/modulo.dto';
import { ModuloEntity } from '../entities/modulo.entity';
import { ModuloManager } from '../manager/modulo.manager';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';

@Injectable()
export class ModuloService {

  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION);

  constructor(
      private readonly moduloManager: ModuloManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly auditLogManager: AuditLogManager,
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
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    const dataUpdate = deleteNullArray(data);
    const idUpdate = {'id':dataUpdate['id']};
    let entityToUpdate = await this.moduloManager.findOneBy(idUpdate);
    const dataOld = plainToInstance(ModuloDTO, entityToUpdate);
    const result = await this.moduloManager.updateBasic(dataUpdate,entityToUpdate);
    if(result){
      status =true;
      message = `El modulo ${result.nombre} se ha actualizado correctamente`;
      if(this.isAudit){
        await this.auditLogManager.logEvent('Edición','Modulo',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
      }
    }
    return { status, message };
  }

  async delete(params:  PayloadData<ModuloDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['activo'] = false;
    data['estado'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    try {
      const idUpdate = {'id':dataUpdate['id']};
      let entityToUpdate = await this.moduloManager.findOneBy(idUpdate);
      const dataOld = plainToInstance(ModuloDTO, entityToUpdate);
      const result = await this.moduloManager.updateBasic(dataUpdate,entityToUpdate);
      if(result){
        status = true;
        message = `El modulo ${result.nombre} ha sido eliminado`;
        if(this.isAudit){
          await this.auditLogManager.logEvent('Eliminación','Modulo',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
        }
      }
    }
    catch (error) {
      status = false;
      message = error.message;
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