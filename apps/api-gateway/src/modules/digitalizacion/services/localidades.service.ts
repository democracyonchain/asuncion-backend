import {  ConnectionInput, FilterById, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ProvinciaDigitalizacionFilterInput } from '../dto/filterType/provincia.filter';
import { CantonDigitalizacionFilterInput } from '../dto/filterType/canton.filter';
import { ParroquiaDigitalizacionFilterInput } from '../dto/filterType/parroquia.filter';
import { ZonaDigitalizacionFilterInput } from '../dto/filterType/zona.filter';
import { JuntaDigitalizacionFilterInput } from '../dto/filterType/junta.filter';


/**
 * Clase donde se conectan los servicios del apigateway con los del microservicio a traves de pattern y proxy
 *
 * @export
 * @class LocalidadesService
 * @typedef {LocalidadesService}
 */
@Injectable()
export class LocalidadesService {
  private clientProxyDigitalizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyDigitalizacion = this.clientProxyService.clientProxyDigitalizacion();
  }

  /**
   * Función para colección de provincia
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?ProvinciaDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async provinciaCollection(pagination: ConnectionInput, where?: ProvinciaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<ProvinciaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
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
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  /**
   * Función para colección de canton
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?CantonDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async cantonCollection(pagination: ConnectionInput, where?: CantonDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.CANTON_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<CantonDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  /**
   * Función para colección de parroquia
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?ParroquiaDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async parroquiaCollection(pagination: ConnectionInput, where?: ParroquiaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.PARROQUIA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<ParroquiaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  /**
   * Función para colección de zona
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?ZonaDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async zonaCollection(pagination: ConnectionInput, where?: ZonaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.ZONA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<ZonaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  /**
   * Función para colección de junta
   *
   * @async
   * @param {ConnectionInput} pagination
   * @param {?JuntaDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @param {?*} [fields]
   * @param {?RespuestaJWTToken} [usuarioAuth]
   * @returns {unknown}
   */
  async juntaCollection(pagination: ConnectionInput, where?: JuntaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.JUNTA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<JuntaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }
}