import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { EstablecimientoDTO, EstablecimientoFilterInput } from '../dto/establecimiento.dto';
import { EstablecimientoService } from '../services/establecimiento.service';

/**
 * Clase controlador con funciones de establecimiento a ser usados por el api-gateway
 *
 * @export
 * @class EstablecimientoController
 * @typedef {EstablecimientoController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('establecimiento')
export class EstablecimientoController {
  constructor(private establecimientoService: EstablecimientoService) {}

  /**
   * Controlador para creación de establecimientos
   *
   * @param {PayloadData<EstablecimientoDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_CREATE)
  establecimientoCreate(@Payload() params: PayloadData<EstablecimientoDTO>) {
      return this.establecimientoService.create(params);
  }

  /**
   * Controlador para actualización de establecimientos
   *
   * @param {PayloadData<EstablecimientoDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_UPDATE)
  establecimientoUpdate(@Payload() params: PayloadData<EstablecimientoDTO>) {
      return this.establecimientoService.update(params);
  }

  /**
   * Controlador para eliminación de establecimiento
   *
   * @param {PayloadData<EstablecimientoDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_DELETE)
  establecimientoDelete(@Payload() params: PayloadData<EstablecimientoDTO>) {
      return this.establecimientoService.delete(params);
  }

  /**
   * Controlador para colección de establecimiento
   *
   * @async
   * @param {FilterDto<EstablecimientoFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_COLLECTION)
  async establecimientoCollection(@Payload() paginacion: FilterDto<EstablecimientoFilterInput>) {
    return await this.establecimientoService.getCollection(paginacion);
  }

  /**
   * Controlador para traer información de establecimiento por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_BY_ID)
  async establecimiento(@Payload() filter: FilterById) {
    return await this.establecimientoService.findById(filter);
  }
}