import {  ConnectionInput, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ConfiguracionFilterInput } from '../dto/filterType/configuracion.filter';


/**
 * Clase donde se conectan los servicios del apogateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class ConfiguracionService
 * @typedef {ConfiguracionService}
 */
@Injectable()
export class ConfiguracionService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  /**
   * Función para obtener colleción de configuración
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?ConfiguracionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async configuracionCollection(pagination: ConnectionInput, where?: ConfiguracionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.CONFIGURACION_COLLECTION;
    const payload: FilterDto<ConfiguracionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}