import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { EstablecimientoDTO, EstablecimientoFilterInput } from '../dto/establecimiento.dto';
import { EstablecimientoService } from '../services/establecimiento.service';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('establecimiento')
export class EstablecimientoController {
  constructor(private establecimientoService: EstablecimientoService) {}

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_CREATE)
  establecimientoCreate(@Payload() params: PayloadData<EstablecimientoDTO>) {
      return this.establecimientoService.create(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_UPDATE)
  establecimientoUpdate(@Payload() params: PayloadData<EstablecimientoDTO>) {
      return this.establecimientoService.update(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_DELETE)
  establecimientoDelete(@Payload() params: PayloadData<EstablecimientoDTO>) {
      return this.establecimientoService.delete(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_COLLECTION)
  async establecimientoCollection(@Payload() paginacion: FilterDto<EstablecimientoFilterInput>) {
    return await this.establecimientoService.getCollection(paginacion);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.ESTABLECIMIENTO_BY_ID)
  async establecimiento(@Payload() filter: FilterById) {
    return await this.establecimientoService.findById(filter);
  }
}