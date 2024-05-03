import {  RespuestaJWT, RespuestaJWTToken, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';


@Injectable()
export class AutorizacionService {
  private clientProxyAutorizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAutorizacion = this.clientProxyService.clientProxyAutorizacion();
  }

  async login(username:string,password:string) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.LOGIN;
    const payload = { user:{'username':username,'password':password }};
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.AUTORIZACION.NAME, err),
    );
  }

  async perfil(usuarioAuth:RespuestaJWT,fields:any) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.PERFIL;
    const payload = { fields:fields, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async cambioPassword(usuarioAuth:RespuestaJWTToken,password:string) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.CAMBIO_PASSWORD;
    const payload = { password:password, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async moduloPermiso(usuarioAuth:RespuestaJWT,fields:any,rol_id:number) {
    const pattern = ConstantesGw.AUTORIZACION.PATTERN.MODULO_PERMISOS_ID;
    const payload = { rol_id:rol_id, dataUser:usuarioAuth,fields:fields };
    return await firstValueFrom(this.clientProxyAutorizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

}