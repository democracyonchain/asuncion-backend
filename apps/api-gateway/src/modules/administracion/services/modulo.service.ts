import {  ConnectionInput, FilterById, FilterDto, PayloadData, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';

import { ModuloCreateInput, ModuloUpdateInput } from '../dto/inputType/modulo.input';
import { ModuloFilterInput } from '../dto/filterType/modulo.filter';


@Injectable()
export class ModuloService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  async moduloCreate(dataModulo: ModuloCreateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MODULO_CREATE;
    const payload: PayloadData<any> = { data: dataModulo, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async moduloUpdate(dataModulo: ModuloUpdateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MODULO_UPDATE;
    const payload: PayloadData<any> = { data: dataModulo, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async moduloDelete(id: number,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MODULO_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async moduloCollection(pagination: ConnectionInput, where?: ModuloFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MODULO_COLLECTION;
    const payload: FilterDto<ModuloFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async modulo(id: number, fields:any, usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MODULO_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}