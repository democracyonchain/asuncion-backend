import { AllRpcExceptionMsFilter, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ActaService } from '../services/acta.service';
import { ActaDigitalizacionFilterInput, ActaDTO } from '../dto/acta';

/**
 * Clase controlador con funciones de acta a ser usados por el api-gateway
 *
 * @export
 * @class ActaController
 * @typedef {ActaController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('acta')
export class ActaController {
  constructor(private actaService: ActaService) {}


  /**
   * Controlador para obtener el acta en base a la junta
   *
   * @async
   * @param {*} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_BY_JUNTA_DIGITALIZACION_LIST)
  async actaByJunta(@Payload() filter: any) {
    return await this.actaService.actaByJunta(filter);
  }

  /**
   * Controlador para obtener el acta en base de la digniddad
   *
   * @async
   * @param {*} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_BY_DIGNIDAD_DIGITALIZACION_LIST)
  async actaByDignidad(@Payload() filter: any) {
    return await this.actaService.actaByDignidad(filter);
  }

  /**
   * Controlador para actualizar datos del acta
   *
   * @param {PayloadData<ActaDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_UPDATE_DIG_DIGITALIZACIION)
  actaUpdate(@Payload() params: PayloadData<ActaDTO>) {
      return this.actaService.update(params);
  }

  /**
   * Controlador para colección del acta
   *
   * @async
   * @param {FilterDto<ActaDigitalizacionFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_COLLECTION_DIGITALIZACION)
  async actaCollection(@Payload() paginacion: FilterDto<ActaDigitalizacionFilterInput>) {
    return await this.actaService.getCollection(paginacion);
  }

  /**
   * Controladdor para quitar el bloqueo del acta
   *
   * @param {PayloadData<ActaDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_LIBERA_DIGITALIZACION)
  actaLiberaUpdate(@Payload() params: PayloadData<ActaDTO>) {
      return this.actaService.updateLibera(params);
  }
}