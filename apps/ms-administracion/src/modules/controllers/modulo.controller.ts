import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { ModuloService } from '../services/modulo.service';
import { ModuloDTO, ModuloFilterInput } from '../dto/modulo.dto';

/**
 * Clase controlador con funciones de modulo a ser usados por el api-gateway
 *
 * @export
 * @class ModuloController
 * @typedef {ModuloController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('modulo')
export class ModuloController {
  constructor(private moduloService: ModuloService) {}

  /**
   * Controlador para crear modulo
   *
   * @param {PayloadData<ModuloDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_CREATE)
  moduloCreate(@Payload() params: PayloadData<ModuloDTO>) {
      return this.moduloService.create(params);
  }

  /**
   * Controlador para actualización de modulo
   *
   * @param {PayloadData<ModuloDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_UPDATE)
  moduloUpdate(@Payload() params: PayloadData<ModuloDTO>) {
      return this.moduloService.update(params);
  }

  /**
   * Controlador para eliminación de modulo
   *
   * @param {PayloadData<ModuloDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_DELETE)
  moduloDelete(@Payload() params: PayloadData<ModuloDTO>) {
      return this.moduloService.delete(params);
  }

  /**
   * Controlador para colección de modulo
   *
   * @async
   * @param {FilterDto<ModuloFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_COLLECTION)
  async moduloCollection(@Payload() paginacion: FilterDto<ModuloFilterInput>) {
    return await this.moduloService.getCollection(paginacion);
  }

  /**
   * Controlador para traer información de modulo por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_BY_ID)
  async modulo(@Payload() filter: FilterById) {
    return await this.moduloService.findById(filter);
  }
}
