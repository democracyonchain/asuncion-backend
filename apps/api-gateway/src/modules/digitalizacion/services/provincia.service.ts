import {  ConnectionInput, FilterById, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ProvinciaDigitalizacionFilterInput } from '../dto/filterType/provincia.filter';


@Injectable()
export class ProvinciaService {
  private clientProxyDigitalizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyDigitalizacion = this.clientProxyService.clientProxyDigitalizacion();
  }

  async provinciaCollection(pagination: ConnectionInput, where?: ProvinciaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<ProvinciaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  async provincia(id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }
}