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

@Injectable()
export class ModuloService {
  constructor(
      private readonly moduloManager: ModuloManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
  ) { }

  async create(params:  PayloadData<ModuloDTO>): Promise<ModuloDTO> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.user.id;
    const dataCreate = deleteNullArray(data);
    const result = await this.moduloManager.insert(dataCreate);
    return plainToInstance(ModuloDTO, result);
  }

  async update(params:  PayloadData<ModuloDTO>): Promise<ModuloDTO> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    const dataUpdate = deleteNullArray(data);
    const result = await this.moduloManager.update(dataUpdate);
    return plainToInstance(ModuloDTO, result);
  }

  async delete(params:  PayloadData<ModuloDTO>): Promise<GlobalResult> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.user.id;
    data['estado'] = false;
    const dataUpdate = deleteNullArray(data);
    let status: boolean = false;
    let message: string = `No existe el registro para eliminar`;
    try {
      const result = await this.moduloManager.update(dataUpdate);
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