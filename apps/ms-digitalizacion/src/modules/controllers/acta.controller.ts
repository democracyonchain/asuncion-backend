import { AllRpcExceptionMsFilter, FilterById, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ActaService } from '../services/acta.service';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('acta')
export class ActaController {
  constructor(private actaService: ActaService) {}


  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_BY_JUNTA_DIGITALIZACION_LIST)
  async actaByJunta(@Payload() filter: FilterById) {
    return await this.actaService.actaByJunta(filter);
  }
}