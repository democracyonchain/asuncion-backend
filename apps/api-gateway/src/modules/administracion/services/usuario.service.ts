import { ConnectionInput, FilterById,FilterDto, PayloadData, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { UsuarioFilterInput } from '../dto/filterType/usuario.filter';
import { UsuarioCreateInput, UsuarioUpdateInput } from '../dto/inputType/usuario.input';


/**
 * Clase donde se conectan los servicios del apogateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class UsuarioService
 * @typedef {UsuarioService}
 */
@Injectable()
export class UsuarioService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  /**
   * Función para colección del usuario
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?UsuarioFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async usuarioCollection(pagination: ConnectionInput, where?: UsuarioFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_COLLECTION;
    const payload: FilterDto<UsuarioFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para traer datos del usuario por id
   *
   * @async
   * @param {number} id
   * @param {*} fields
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async usuario(id: number, fields:any, usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para crear usuario
   *
   * @async
   * @param {UsuarioCreateInput} dataUsuario
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async usuarioCreate(dataUsuario: UsuarioCreateInput, usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_CREATE;
    const payload: PayloadData<any> = { data: dataUsuario, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para editar usuario
   *
   * @async
   * @param {UsuarioUpdateInput} dataUsuario
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async usuarioUpdate(dataUsuario: UsuarioUpdateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_UPDATE;
    const payload: PayloadData<any> = { data: dataUsuario, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  /**
   * Función para eliminar usuario
   *
   * @async
   * @param {number} id
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async usuarioDelete(id: number,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}