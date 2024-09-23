import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { RolService } from '../services/rol.service';
import { RolDTO, RolFilterInput } from '../dto/rol.dto';

/**
 * Clase controlador con funciones de rol a ser usados por el api-gateway
 *
 * @export
 * @class RolController
 * @typedef {RolController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('rol')
export class RolController {
  constructor(private rolService: RolService) {}

  /**
   * Controlador para crear rol
   *
   * @param {PayloadData<RolDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_CREATE)
  rolCreate(@Payload() params: PayloadData<RolDTO>) {
      return this.rolService.create(params);
  }

  /**
   * Controlador para actualización de rol
   *
   * @param {PayloadData<RolDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_UPDATE)
  rolUpdate(@Payload() params: PayloadData<RolDTO>) {
      return this.rolService.update(params);
  }

  /**
   * Controlador para eliminación de rol
   *
   * @param {PayloadData<RolDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_DELETE)
  rolDelete(@Payload() params: PayloadData<RolDTO>) {
      return this.rolService.delete(params);
  }

  /**
   * Controlador para colección de rol
   *
   * @async
   * @param {FilterDto<RolFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_COLLECTION)
  async rolCollection(@Payload() paginacion: FilterDto<RolFilterInput>) {
    return await this.rolService.getCollection(paginacion);
  }

  /**
   * Controlador para traer información de rol por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_BY_ID)
  async rol(@Payload() filter: FilterById) {
    return await this.rolService.findById(filter);
  }
}