import { AllRpcExceptionMsFilter, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { DignidadService } from '../services/dignidad.service';
import { DignidadFilterInput } from '../dto/dignidad.dto';

/**
 * Clase controlador con funciones de dignidad a ser usados por el api-gateway
 *
 * @export
 * @class DignidadController
 * @typedef {DignidadController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('dignidad')
export class DignidadController {
  constructor(private dignidadService: DignidadService) {}

  /**
   * Controlador para colección de dignidad
   *
   * @async
   * @param {FilterDto<DignidadFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.DIGNIDAD_DIGITALIZACION_COLLECTION)
  async dignidadCollection(@Payload() paginacion: FilterDto<DignidadFilterInput>) {
    return await this.dignidadService.getCollectionDignidad(paginacion);
  }
}