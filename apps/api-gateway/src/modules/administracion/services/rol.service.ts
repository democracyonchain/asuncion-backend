import {  ConnectionInput, FilterById, FilterDto, PayloadData, RespuestaJWT, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { RolCreateInput, RolUpdateInput } from '../dto/inputType/rol.input';
import { RolFilterInput } from '../dto/filterType/rol.filter';


@Injectable()
export class RolService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  async rolCreate(dataRol: RolCreateInput,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ROL_CREATE;
    const payload: PayloadData<any> = { data: dataRol, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async rolUpdate(dataRol: RolUpdateInput,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ROL_UPDATE;
    const payload: PayloadData<any> = { data: dataRol, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async rolDelete(id: number,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ROL_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async rolCollection(pagination: ConnectionInput, where?: RolFilterInput, order?: StringOrderInput, fields?: any) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ROL_COLLECTION;
    const payload: FilterDto<RolFilterInput> = { pagination, where, order, fields };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async rol(id: number, fields:any) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.ROL_BY_ID;
    const payload: FilterById = { id, fields };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}