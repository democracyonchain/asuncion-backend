import { AllRpcExceptionMsFilter, FilterById, FilterByIdUser, FilterDto, LogMsInterceptor, PayloadData, Userdata } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { AutorizacionService } from '../services/autorizacion.service';
import { Login } from '../dto/login.dto';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('autorizacion')
export class AutorizacionController {
  constructor(private autorizacionService: AutorizacionService) {}  

  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.LOGIN)
  async login(@Payload() params: Userdata<Login>) {
    const data = await this.autorizacionService.login(params);
    return data;
  }

  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.PERFIL)
  perfil(@Payload() params: any) {
      return this.autorizacionService.perfil(params);
  }

  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.CAMBIO_PASSWORD)
  cambioPassword(@Payload() params: any) {
      return this.autorizacionService.cambioPassword(params);
  }

  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.MODULO_PERMISOS_ID)
  moduloPermiso(@Payload() params: any) {
      return this.autorizacionService.moduloPermiso(params);
  }

}
