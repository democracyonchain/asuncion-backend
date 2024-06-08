import { AllRpcExceptionMsFilter, FilterById, FilterByIdUser, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { ModuloService } from '../services/modulo.service';
import { ModuloDTO, ModuloFilterInput } from '../dto/modulo.dto';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('modulo')
export class ModuloController {
  constructor(private moduloService: ModuloService) {}

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_CREATE)
  moduloCreate(@Payload() params: PayloadData<ModuloDTO>) {
      return this.moduloService.create(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_UPDATE)
  moduloUpdate(@Payload() params: PayloadData<ModuloDTO>) {
      return this.moduloService.update(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_DELETE)
  moduloDelete(@Payload() params: PayloadData<ModuloDTO>) {
      return this.moduloService.delete(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_COLLECTION)
  async moduloCollection(@Payload() paginacion: FilterDto<ModuloFilterInput>) {
    return await this.moduloService.getCollection(paginacion);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.MODULO_BY_ID)
  async modulo(@Payload() filter: FilterById) {
    return await this.moduloService.findById(filter);
  }
}
