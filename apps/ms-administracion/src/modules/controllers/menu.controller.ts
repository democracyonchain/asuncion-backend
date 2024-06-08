import { AllRpcExceptionMsFilter, FilterById, FilterByIdUser, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { MenuService } from '../services/menu.service';
import { MenuDTO, MenuFilterInput } from '../dto/menu.dto';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_CREATE)
  menuCreate(@Payload() params: PayloadData<MenuDTO>) {
      return this.menuService.create(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_UPDATE)
  menuUpdate(@Payload() params: PayloadData<MenuDTO>) {
      return this.menuService.update(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_DELETE)
  menuDelete(@Payload() params: PayloadData<MenuDTO>) {
      return this.menuService.delete(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_COLLECTION)
  async menuCollection(@Payload() paginacion: FilterDto<MenuFilterInput>) {
    return await this.menuService.getCollection(paginacion);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MENU_BY_ID)
  async menu(@Payload() filter: FilterById) {
    return await this.menuService.findById(filter);
  }
}