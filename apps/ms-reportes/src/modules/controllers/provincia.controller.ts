import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesReportes } from '../../common/constantes-reportes';
import { ProvinciaFilterInput } from '../dto/provincia.dto';
import { ProvinciaService } from '../services/provincia.service';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('provincia')
export class ProvinciaController {
  constructor(private provinciaService: ProvinciaService) {}

  @MessagePattern(ConstantesReportes.REPORTES.PATTERN.PROVINCIA_REPORTES_COLLECTION)
  async provinciaCollection(@Payload() paginacion: FilterDto<ProvinciaFilterInput>) {
    return await this.provinciaService.getCollection(paginacion);
  }

  @MessagePattern(ConstantesReportes.REPORTES.PATTERN.PROVINCIA_REPORTES_BY_ID)
  async provincia(@Payload() filter: FilterById) {
    return await this.provinciaService.findById(filter);
  }
}