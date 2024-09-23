import { Injectable, Logger } from '@nestjs/common';
import { Establecimiento, EstablecimientoDTO } from '../dto/establecimiento.dto';
import { EstablecimientoEntity } from '../entities/establecimiento.entity';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';
import { EstablecimientoManager } from '../manager/establecimiento.manager';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de establecimiento
 *
 * @export
 * @class EstablecimientoService
 * @typedef {EstablecimientoService}
 */
@Injectable()
export class EstablecimientoService {
  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION);

  constructor(
      private readonly establecimientoManager: EstablecimientoManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly auditLogManager: AuditLogManager,
  ) { }

  async create(params:  PayloadData<EstablecimientoDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de crear el establecimiento`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(EstablecimientoEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.user.id;
    const dataCreate = deleteNullArray(data);
    const result = await this.establecimientoManager.insert(dataCreate);
    if(result){
      status =true;
      message = `El establecimiento ${result.nombre} se ha creado correctamente`;
    }
    return { status, message };
  }

  async update(params:  PayloadData<EstablecimientoDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de actualizar el establecimiento`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(EstablecimientoEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    const dataUpdate = deleteNullArray(data);
    const idUpdate = {'id':dataUpdate['id']};
   
    let entityToUpdate = await this.establecimientoManager.findOneBy(idUpdate);
    const dataOld = plainToInstance(EstablecimientoDTO, entityToUpdate);
    dataUpdate.logo = Buffer.from(dataUpdate.logo, 'base64');
    const result = await this.establecimientoManager.updateBasic(dataUpdate,entityToUpdate);
    if(result){
      status =true;
      message = `El establecimiento ${result.nombre} se ha actualizado correctamente`;
      if(this.isAudit){
        await this.auditLogManager.logEvent('Edición','Establecimiento',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
      }
    }
    return { status, message };
  }

  async delete(params:  PayloadData<EstablecimientoDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(EstablecimientoEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['activo'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    try {
      const idUpdate = {'id':dataUpdate['id']};
      let entityToUpdate = await this.establecimientoManager.findOneBy(idUpdate);
      const dataOld = plainToInstance(EstablecimientoDTO, entityToUpdate);
      const result = await this.establecimientoManager.updateBasic(dataUpdate,entityToUpdate);
      if(result){
        status = true;
        message = `El establecimiento ${result.nombre} ha sido eliminado`;
        if(this.isAudit){
          await this.auditLogManager.logEvent('Eliminación','Establecimiento',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
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

  async getCollection(paginacion: any): Promise<CollectionType<Establecimiento>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.establecimientoManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Establecimiento>, data);
  }

  async findById(filter: FilterById): Promise<Establecimiento> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.establecimientoManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
      },
      relations: fields.relations,
    });
    return plainToInstance(Establecimiento, data[0]);
  }
}