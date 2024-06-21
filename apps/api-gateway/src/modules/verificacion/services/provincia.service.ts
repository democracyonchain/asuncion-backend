import {  ConnectionInput, FilterById, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ProvinciaVerificacionFilterInput } from '../dto/filterType/provincia.filter';


@Injectable()
export class ProvinciaService {
  private clientProxyVerificacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyVerificacion = this.clientProxyService.clientProxyVerificacion();
  }

  async provinciaCollection(pagination: ConnectionInput, where?: ProvinciaVerificacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.VERIFICACION.PATTERN.PROVINCIA_VERIFICACION_COLLECTION;
    const payload: FilterDto<ProvinciaVerificacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyVerificacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.VERIFICACION.NAME, err),
    );
  }

  async provincia(id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.VERIFICACION.PATTERN.PROVINCIA_VERIFICACION_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyVerificacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.VERIFICACION.NAME, err),
    );
  }
}