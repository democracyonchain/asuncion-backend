import { AllRpcExceptionMsFilter, LogMsInterceptor, Userdata } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { AutorizacionService } from '../services/autorizacion.service';
import { Login } from '../dto/login.dto';

/**
 * Clase controlador con funciones de configuraciones a ser usados por el api-gateway
 *
 * @export
 * @class AutorizacionController
 * @typedef {AutorizacionController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('autorizacion')
export class AutorizacionController {
  constructor(private autorizacionService: AutorizacionService) {}  

  /**
   * Controlador para logearse en el sistema
   *
   * @async
   * @param {Userdata<Login>} params
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.LOGIN)
  async login(@Payload() params: Userdata<Login>) {
    const data = await this.autorizacionService.login(params);
    return data;
  }

  /**
   * Controlador para obtener el perfil en base al token 
   *
   * @param {*} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.PERFIL)
  perfil(@Payload() params: any) {
      return this.autorizacionService.perfil(params);
  }

  /**
   * Controlador para cambiar el password
   *
   * @param {*} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.CAMBIO_PASSWORD)
  cambioPassword(@Payload() params: any) {
      return this.autorizacionService.cambioPassword(params);
  }

  /**
   * Controlador para visualizar 
   *
   * @param {*} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.MODULO_PERMISOS_ID)
  moduloPermiso(@Payload() params: any) {
      return this.autorizacionService.moduloPermiso(params);
  }

  @MessagePattern(ConstantesAutorizacion.AUTORIZACION.PATTERN.LOGOUT)
  authlogout(@Payload() params: any) {
      return this.autorizacionService.authlogout(params);
  }

}
