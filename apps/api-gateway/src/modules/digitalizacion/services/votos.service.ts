import { PayloadData, RespuestaJWTToken, manageErrorsGw } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConstantesGw } from '../../../common/constants/constantes-gw';
import { ClientProxyService } from '../../../config/client-proxy.service';
import { VotoDigitacionsUpdateInput } from '../dto/inputType/votos.input';


@Injectable()
export class VotosService {
  private clientProxyDigitalizacion: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientProxyDigitalizacion = this.clientProxyService.clientProxyDigitalizacion();
  }

  async votosDigitalizacionUpdate(dataMenu: VotoDigitacionsUpdateInput,usuarioAuth:RespuestaJWTToken) {
    const pattern = ConstantesGw.DIGITALIZACION.PATTERN.VOTOS_UPDATE_DIG_DIGITALIZACION;
    const payload: PayloadData<any> = { data: dataMenu, dataUser:usuarioAuth };
    return await firstValueFrom(this.clientProxyDigitalizacion.send(pattern, payload)).catch((err) =>
      manageErrorsGw(ConstantesGw.DIGITALIZACION.NAME, err),
    );
  }

}