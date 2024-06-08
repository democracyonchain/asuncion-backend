import { AllRpcExceptionMsFilter, FilterById, FilterByIdUser, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { RolService } from '../services/rol.service';
import { RolDTO, RolFilterInput } from '../dto/rol.dto';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('rol')
export class RolController {
  constructor(private rolService: RolService) {}

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_CREATE)
  rolCreate(@Payload() params: PayloadData<RolDTO>) {
      return this.rolService.create(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_UPDATE)
  rolUpdate(@Payload() params: PayloadData<RolDTO>) {
      return this.rolService.update(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_DELETE)
  rolDelete(@Payload() params: PayloadData<RolDTO>) {
      return this.rolService.delete(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_COLLECTION)
  async rolCollection(@Payload() paginacion: FilterDto<RolFilterInput>) {
    return await this.rolService.getCollection(paginacion);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ROL_BY_ID)
  async rol(@Payload() filter: FilterById) {
    return await this.rolService.findById(filter);
  }
}