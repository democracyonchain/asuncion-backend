import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { MenuService } from '../services/menu.service';
import { MenuDTO, MenuFilterInput } from '../dto/menu.dto';

/**
 * Clase controlador con funciones de menu a ser usados por el api-gateway
 *
 * @export
 * @class MenuController
 * @typedef {MenuController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  /**
   * Controlador para crear menu
   *
   * @param {PayloadData<MenuDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_CREATE)
  menuCreate(@Payload() params: PayloadData<MenuDTO>) {
      return this.menuService.create(params);
  }

  /**
   * Controlador para actualización de menu
   *
   * @param {PayloadData<MenuDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_UPDATE)
  menuUpdate(@Payload() params: PayloadData<MenuDTO>) {
      return this.menuService.update(params);
  }

  /**
   * Controlador para eliminación de menu
   *
   * @param {PayloadData<MenuDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_DELETE)
  menuDelete(@Payload() params: PayloadData<MenuDTO>) {
      return this.menuService.delete(params);
  }

  /**
   * Controlador para colección de menu
   *
   * @async
   * @param {FilterDto<MenuFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_COLLECTION)
  async menuCollection(@Payload() paginacion: FilterDto<MenuFilterInput>) {
    return await this.menuService.getCollection(paginacion);
  }

  /**
   * Controlador para traer información de menu por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_BY_ID)
  async menu(@Payload() filter: FilterById) {
    return await this.menuService.findById(filter);
  }
}