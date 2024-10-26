import { AllRpcExceptionMsFilter, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { ConfiguracionFilterInput } from '../dto/configuracion.dto';
import { ConfiguracionService } from '../services/configuracion.service';

/**
 * Clase controlador con funciones de configuraciones a ser usados por el api-gateway
 *
 * @export
 * @class ConfiguracionController
 * @typedef {ConfiguracionController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('configuracion')
export class ConfiguracionController {
  constructor(private configuracionService: ConfiguracionService) {}

  /**
   * Controlador para colección de configuración
   *
   * @async
   * @param {FilterDto<ConfiguracionFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.CONFIGURACION_COLLECTION)
  async configuracionCollection(@Payload() paginacion: FilterDto<ConfiguracionFilterInput>) {
    return await this.configuracionService.getCollection(paginacion);
  }
}