import { AllRpcExceptionMsFilter, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ActaService } from '../services/acta.service';
import { ActaDTO } from '../dto/acta';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('acta')
export class ActaController {
  constructor(private actaService: ActaService) {}


  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_BY_JUNTA_DIGITALIZACION_LIST)
  async actaByJunta(@Payload() filter: any) {
    return await this.actaService.actaByJunta(filter);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_BY_DIGNIDAD_DIGITALIZACION_LIST)
  async actaByDignidad(@Payload() filter: any) {
    return await this.actaService.actaByDignidad(filter);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ACTA_UPDATE_DIG_DIGITALIZACIION)
  actaUpdate(@Payload() params: PayloadData<ActaDTO>) {
      return this.actaService.update(params);
  }
}