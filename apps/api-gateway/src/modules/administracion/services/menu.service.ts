import {  ConnectionInput, FilterById, FilterDto, PayloadData, RespuestaJWT, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { MenuCreateInput, MenuUpdateInput } from '../dto/inputType/menu.input';
import { MenuFilterInput } from '../dto/filterType/menu.filter';


@Injectable()
export class MenuService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  async menuCreate(dataMenu: MenuCreateInput,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_CREATE;
    const payload: PayloadData<any> = { data: dataMenu, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async menuUpdate(dataMenu: MenuUpdateInput,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_UPDATE;
    const payload: PayloadData<any> = { data: dataMenu, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async menuDelete(id: number,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async menuCollection(pagination: ConnectionInput, where?: MenuFilterInput, order?: StringOrderInput, fields?: any) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_COLLECTION;
    const payload: FilterDto<MenuFilterInput> = { pagination, where, order, fields };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async menu(id: number, fields:any) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_BY_ID;
    const payload: FilterById = { id, fields };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}