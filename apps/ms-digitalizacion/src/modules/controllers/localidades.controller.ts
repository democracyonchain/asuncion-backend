import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ProvinciaFilterInput } from '../dto/provincia.dto';
import { LocalidadesService } from '../services/localidades.service';
import { CantonFilterInput } from '../dto/canton.dto';
import { ParroquiaFilterInput } from '../dto/parroquia.dto';
import { ZonaFilterInput } from '../dto/zona.dto';
import { JuntaFilterInput } from '../dto/junta.dto';

/**
 * Clase controlador con funciones de provincia, canton, parroquia a ser usados por el api-gateway
 *
 * @export
 * @class LocalidadesController
 * @typedef {LocalidadesController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('localidades')
export class LocalidadesController {
  constructor(private localidadesService: LocalidadesService) {}

  /**
   * Controlador para colección de provincia
   *
   * @async
   * @param {FilterDto<ProvinciaFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_COLLECTION)
  async provinciaCollection(@Payload() paginacion: FilterDto<ProvinciaFilterInput>) {
    return await this.localidadesService.getCollectionProvincia(paginacion);
  }

  /**
   * Controlador para obtener provincia en base al id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_BY_ID)
  async provincia(@Payload() filter: FilterById) {
    return await this.localidadesService.findByIdProvincia(filter);
  }

  /**
   * Controlador de colección de canton
   *
   * @async
   * @param {FilterDto<CantonFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.CANTON_DIGITALIZACION_COLLECTION)
  async cantonCollection(@Payload() paginacion: FilterDto<CantonFilterInput>) {
    return await this.localidadesService.getCollectionCanton(paginacion);
  }

  /**
   * Controlador para colección de parroquia
   *
   * @async
   * @param {FilterDto<ParroquiaFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.PARROQUIA_DIGITALIZACION_COLLECTION)
  async parroquiaCollection(@Payload() paginacion: FilterDto<ParroquiaFilterInput>) {
    return await this.localidadesService.getCollectionParroquia(paginacion);
  }

  /**
   * Controlador para colleción de zona
   *
   * @async
   * @param {FilterDto<ZonaFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ZONA_DIGITALIZACION_COLLECTION)
  async zonaCollection(@Payload() paginacion: FilterDto<ZonaFilterInput>) {
    return await this.localidadesService.getCollectionZona(paginacion);
  }

  /**
   * Controlador para colección de junta
   *
   * @async
   * @param {FilterDto<JuntaFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.JUNTA_DIGITALIZACION_COLLECTION)
  async juntaCollection(@Payload() paginacion: FilterDto<JuntaFilterInput>) {
    return await this.localidadesService.getCollectionJunta(paginacion);
  }
}