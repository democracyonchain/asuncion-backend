/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Modulo, ModuloDTO } from '../dto/modulo.dto';
import { ModuloEntity } from '../entities/modulo.entity';
import { ModuloManager } from '../manager/modulo.manager';
import { CollectionType, FilterById, MutatioResult, PayloadData, changeFalseToTrue, deleteNullArray } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import * as bcryptjs from "bcryptjs";

@Injectable()
export class ModuloService {
  constructor(
      private readonly moduloManager: ModuloManager,
  ) { }

  async create(params:  PayloadData<ModuloDTO>): Promise<ModuloDTO> {
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariocreacion_id'] = params.dataUser.id;
    const dataCreate = deleteNullArray(data);
    const result = await this.moduloManager.insert(dataCreate);
    return plainToInstance(ModuloDTO, result);
  }

  async update(params:  PayloadData<ModuloDTO>): Promise<ModuloDTO> {
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.id;
    const dataUpdate = deleteNullArray(data);
    const result = await this.moduloManager.update(dataUpdate);
    return plainToInstance(ModuloDTO, result);
  }

  async delete(params:  PayloadData<ModuloDTO>): Promise<MutatioResult> {
    let  data = plainToInstance(ModuloEntity, params.data) 
    data['usuariomodificacion_id'] = params.dataUser.id;
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
    const data = await this.moduloManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Modulo>, data);
  }

  async findById(filter: FilterById): Promise<Modulo> {
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