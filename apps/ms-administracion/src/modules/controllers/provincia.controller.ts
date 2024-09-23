import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { ProvinciaFilterInput } from '../dto/provincia.dto';
import { ProvinciaService } from '../services/provincia.service';

/**
 * Clase controlador con funciones de provincia a ser usados por el api-gateway
 *
 * @export
 * @class ProvinciaController
 * @typedef {ProvinciaController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('provincia')
export class ProvinciaController {
  constructor(private provinciaService: ProvinciaService) {}

  /**
   * Controlador para colección de provincia
   *
   * @async
   * @param {FilterDto<ProvinciaFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.PROVINCIA_COLLECTION)
  async provinciaCollection(@Payload() paginacion: FilterDto<ProvinciaFilterInput>) {
    return await this.provinciaService.getCollection(paginacion);
  }

  /**
   * Controlador para traer información de provincia por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.PROVINCIA_BY_ID)
  async provincia(@Payload() filter: FilterById) {
    return await this.provinciaService.findById(filter);
  }
}