import { AllRpcExceptionMsFilter, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { DignidadService } from '../services/dignidad.service';
import { DignidadFilterInput } from '../dto/dignidad.dto';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('dignidad')
export class DignidadController {
  constructor(private dignidadService: DignidadService) {}

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.DIGNIDAD_DIGITALIZACION_COLLECTION)
  async dignidadCollection(@Payload() paginacion: FilterDto<DignidadFilterInput>) {
    return await this.dignidadService.getCollectionDignidad(paginacion);
  }
}