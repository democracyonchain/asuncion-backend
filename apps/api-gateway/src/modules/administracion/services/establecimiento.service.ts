import {  ConnectionInput, FilterById, FilterDto, PayloadData, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { EstablecimientoCreateInput, EstablecimientoUpdateInput } from '../dto/inputType/establecimiento.input';
import { EstablecimientoFilterInput } from '../dto/filterType/establecimiento.filter';


@Injectable()
export class EstablecimientoService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  async establecimientoCreate(data: EstablecimientoCreateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_CREATE;
    const payload: PayloadData<any> = { data: data, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async establecimientoUpdate(data: EstablecimientoUpdateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_UPDATE;
    const payload: PayloadData<any> = { data: data, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async establecimientoDelete(id: number,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async establecimientoCollection(pagination: ConnectionInput, where?: EstablecimientoFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_COLLECTION;
    const payload: FilterDto<EstablecimientoFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async establecimiento(id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}