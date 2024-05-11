/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { Injectable } from '@nestjs/common';
import { CollectionType, FilterById, GlobalResult, PayloadData, changeFalseToTrue, deleteNullArray} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { Menu, MenuDTO } from '../dto/menu.dto';
import { MenuEntity } from '../entities/menu.entity';
import { MenuManager } from '../manager/menu.manager';
import { AuditLogManager } from '../manager/audit/audit-log.manager';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';

@Injectable()
export class MenuService {
  
  private readonly isAudit = JSON.parse(process.env.AUDIT_ADMINISTRACION)
  
  constructor(
      private readonly menuManager: MenuManager,
      private readonly auditLogManager: AuditLogManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
  ) {}

  async create(params:  PayloadData<MenuDTO>): Promise<MenuDTO> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(MenuEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.user.id;
    const dataCreate = deleteNullArray(data);
    const result = await this.menuManager.insert(dataCreate);
    return plainToInstance(MenuDTO, result);
  }

  async update(params:  PayloadData<MenuDTO>): Promise<MenuDTO> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(MenuEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    const dataUpdate = deleteNullArray(data);
    const idUpdate = {'id':dataUpdate['id']};
    let entityToUpdate = await this.menuManager.findOneBy(idUpdate);
    if(this.isAudit){
      await this.auditLogManager.logEvent('Edición','Menú',params.dataUser.user.id,dataUpdate,plainToInstance(MenuDTO, entityToUpdate));
    }
    const result = await this.menuManager.updateBasic(dataUpdate,false,entityToUpdate);
    return plainToInstance(MenuDTO, result);
  }

  async delete(params:  PayloadData<MenuDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(MenuEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['estado'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    try {
      const result = await this.menuManager.update(dataUpdate);
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