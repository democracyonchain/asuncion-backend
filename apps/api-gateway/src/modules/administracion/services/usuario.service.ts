import { ConnectionInput, FilterById, FilterByIdUser, FilterDto, PayloadData, RespuestaJWT, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { UsuarioFilterInput } from '../dto/filterType/usuario.filter';
import { UsuarioCreateInput, UsuarioUpdateInput } from '../dto/inputType/usuario.input';


@Injectable()
export class UsuarioService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  async usuarioCollection(pagination: ConnectionInput, where?: UsuarioFilterInput, order?: StringOrderInput, fields?: any) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_COLLECTION;
    const payload: FilterDto<UsuarioFilterInput> = { pagination, where, order, fields };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async usuario(id: number, fields:any) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_BY_ID;
    const payload: FilterById = { id, fields };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async usuarioCreate(dataUsuario: UsuarioCreateInput, usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_CREATE;
    const payload: PayloadData<any> = { data: dataUsuario, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async usuarioUpdate(dataUsuario: UsuarioUpdateInput,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_UPDATE;
    const payload: PayloadData<any> = { data: dataUsuario, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }

  async usuarioDelete(id: number,usuarioAuth:RespuestaJWT) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.USUARIO_DELETE;
    const payload: PayloadData<any> = { data: { 'id': id }, dataUser: usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}