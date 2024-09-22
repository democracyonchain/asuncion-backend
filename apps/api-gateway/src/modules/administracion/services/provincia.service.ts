import {  ConnectionInput, FilterById, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ProvinciaFilterInput } from '../dto/filterType/provincia.filter';


/**
 * Clase donde se conectan los servicios del apigateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class ProvinciaService
 * @typedef {ProvinciaService}
 */
@Injectable()
export class ProvinciaService {
  private clientProxyAdministracion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyAdministracion = this.clientProxyService.clientProxyAdministracion();
  }

  /**
   * Función para colección de provincia
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?ProvinciaFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async provinciaCollection(pagination: ConnectionInput, where?: ProvinciaFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.PROVINCIA_COLLECTION;
    const payload: FilterDto<ProvinciaFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
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
    const pattern = ConstantesGw.ADMINISTRACION.PATTERN.PROVINCIA_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyAdministracion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.ADMINISTRACION.NAME, err),
    );
  }
}