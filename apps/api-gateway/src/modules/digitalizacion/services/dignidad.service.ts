import {  ConnectionInput, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { DignidadDigitalizacionFilterInput } from '../dto/filterType/dignidad.filter';


/**
 * Clase donde se conectan los servicios del apigateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class DignidadService
 * @typedef {DignidadService}
 */
@Injectable()
export class DignidadService {
  private clientProxyDigitalizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyDigitalizacion = this.clientProxyService.clientProxyDigitalizacion();
  }

  async dignidadCollection(pagination: ConnectionInput, where?: DignidadDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.DIGNIDAD_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<DignidadDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }
}