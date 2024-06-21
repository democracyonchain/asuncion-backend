import {  ConnectionInput, FilterById, FilterDto, RespuestaJWTToken, StringOrderInput, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ProvinciaReportesFilterInput } from '../dto/filterType/provincia.filter';


@Injectable()
export class ProvinciaService {
  private clientProxyReportes: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyReportes = this.clientProxyService.clientProxyReportes();
  }

  async provinciaCollection(pagination: ConnectionInput, where?: ProvinciaReportesFilterInput, order?: StringOrderInput, fields?: any, usuarioAuth?: RespuestaJWTToken) {
    const pattern = ConstantesGw.REPORTES.PATTERN.PROVINCIA_REPORTES_COLLECTION;
    const payload: FilterDto<ProvinciaReportesFilterInput> = { pagination, where, order, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyReportes.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.REPORTES.NAME, err),
    );
  }

  async provincia(id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.REPORTES.PATTERN.PROVINCIA_REPORTES_BY_ID;
    const payload: FilterById = { id, fields, usuarioAuth };
    return await firstValueFrom(this.clientProxyReportes.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.REPORTES.NAME, err),
    );
  }
}