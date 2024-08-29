import { PayloadData, RespuestaJWTToken, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { ActaUpdateInput } from '../dto/inputType/acta.input';


@Injectable()
export class ActaService {
  private clientProxyDigitalizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyDigitalizacion = this.clientProxyService.clientProxyDigitalizacion();
  }

  async actaByJunta(junta_id: number, dignidad_id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.ACTA_BY_JUNTA_DIGITALIZACION_LIST;
    const payload = { junta_id:junta_id, dignidad_id:dignidad_id, fields:fields, usuarioAuth:usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  async actaByDignidad(dignidad_id: number, fields:any, usuarioAuth: RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.ACTA_BY_DIGNIDAD_DIGITALIZACION_LIST;
    const payload = {dignidad_id:dignidad_id, fields:fields, usuarioAuth:usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

  async digtActaUpdate(dataActa: ActaUpdateInput, usuarioAuth: any) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.ACTA_UPDATE_DIG_DIGITALIZACIION;
    const payload: PayloadData<any> = { data: dataActa, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }
}