import {  ConnectionInput, FilterById, FilterDto, PayloadData, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { MenuCreateInput, MenuUpdateInput } from '../dto/inputType/menu.input';
import { MenuFilterInput } from '../dto/filterType/menu.filter';


/**
 * Clase donde se conectan los servicios del apogateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class MenuService
 * @typedef {MenuService}
 */
@Injectable()
export class MenuService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  /**
   * Función para crear menú
   *
   * @async
   * @param {MenuCreateInput} dataMenu
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async menuCreate(dataMenu: MenuCreateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_CREATE;
    const payload: PayloadData<any> = { data: dataMenu, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Funcioón para actualizar menú
   *
   * @async
   * @param {MenuUpdateInput} dataMenu
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async menuUpdate(dataMenu: MenuUpdateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_UPDATE;
    const payload: PayloadData<any> = { data: dataMenu, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para elminar menú
   *
   * @async
   * @param {number} id
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async menuDelete(id: number,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para colección de menús
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?MenuFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async menuCollection(pagination: ConnectionInput, where?: MenuFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_COLLECTION;
    const payload: FilterDto<MenuFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para traer datos de un menú por id
   *
   * @async
   * @param {number} id
   * @param {*} fields
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async menu(id: number, fields:any, usuarioAuth?:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.MENU_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}