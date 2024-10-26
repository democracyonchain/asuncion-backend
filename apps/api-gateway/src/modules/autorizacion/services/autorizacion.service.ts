import { RespuestaJWTToken, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';


/**
 * Clase donde se conectan los servicios del apigateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class AutorizacionService
 * @typedef {AutorizacionService}
 */
@Injectable()
export class AutorizacionService {
  private clientProxyAutorizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAutorizacion = this.clientProxyService.clientProxyAutorizacion();
  }

  /**
   * Función para obtener el token 
   *
   * @async
   * @param {string} username
   * @param {string} password
   * @returns {unknown}
   */
  async login(username:string,password:string) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.LOGIN;
    const payload = { user:{'username':username,'password':password }};
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.AUTORIZACION.NAME, err),
    );
  }

  /**
   * Función para obtener los roles
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {*} fields
   * @returns {unknown}
   */
  async perfil(usuarioAuth:RespuestaJWTToken,fields:any) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.PERFIL;
    const payload = { fields:fields, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.AUTORIZACION.NAME, err),
    );
  }

  /**
   * Función para cambiar el password
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {string} password
   * @param {number} id
   * @returns {unknown}
   */
  async cambioPassword(usuarioAuth:RespuestaJWTToken,password:string,id:number) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.CAMBIO_PASSWORD;
    const payload = { password:password, dataUser:usuarioAuth, id:id };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.AUTORIZACION.NAME, err),
    );
  }

  /**
   * Función para traer los permisos por rol
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {*} fields
   * @param {number} rol_id
   * @returns {unknown}
   */
  async moduloPermiso(usuarioAuth:RespuestaJWTToken,fields:any,rol_id:number) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.MODULO_PERMISOS_ID;
    const payload = { rol_id:rol_id, dataUser:usuarioAuth,fields:fields };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.AUTORIZACION.NAME, err),
    );
  }

  /**
   * Servicio para deslogearse
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async authlogout(usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.LOGOUT;
    const payload = {dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.AUTORIZACION.NAME, err),
    );
  }

}