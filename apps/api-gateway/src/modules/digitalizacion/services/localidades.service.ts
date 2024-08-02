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


@Injectable()
export class LocalidadesService {
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

  async cantonCollection(pagination: ConnectionInput, where?: CantonDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.CANTON_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<CantonDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  async parroquiaCollection(pagination: ConnectionInput, where?: ParroquiaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.PARROQUIA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<ParroquiaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  async zonaCollection(pagination: ConnectionInput, where?: ZonaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.ZONA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<ZonaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  async juntaCollection(pagination: ConnectionInput, where?: JuntaDigitalizacionFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.JUNTA_DIGITALIZACION_COLLECTION;
    const payload: FilterDto<JuntaDigitalizacionFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }
}