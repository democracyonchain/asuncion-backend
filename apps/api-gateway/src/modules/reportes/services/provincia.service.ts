import {  ConnectionInput, FilterById, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ProvinciaReportesFilterInput } from '../dto/filterType/provincia.filter';


/**
 * Clase donde se conectan los servicios del apogateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class ProvinciaService
 * @typedef {ProvinciaService}
 */
@Injectable()
export class ProvinciaService {
  private clientProxyReportes: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyReportes = this.clientProxyService.clientProxyReportes();
  }

  /**
   * Función para colección de provincia
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?ProvinciaReportesFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async provinciaCollection(pagination: ConnectionInput, where?: ProvinciaReportesFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.REPORTES.PATTERN.PROVINCIA_REPORTES_COLLECTION;
    const payload: FilterDto<ProvinciaReportesFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyReportes.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.REPORTES.NAME, err),
    );
  }

  /**
   * Función para traer datos de provincia por id 
   *
   * @async
   * @param {number} id
   * @param {*} fields
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  async provincia(id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.REPORTES.PATTERN.PROVINCIA_REPORTES_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyReportes.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.REPORTES.NAME, err),
    );
  }
}