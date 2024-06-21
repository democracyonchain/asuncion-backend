import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesVerificacion } from '../../common/constantes-verificacion';
import { ProvinciaFilterInput } from '../dto/provincia.dto';
import { ProvinciaService } from '../services/provincia.service';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('provincia')
export class ProvinciaController {
  constructor(private provinciaService: ProvinciaService) {}

  @MessagePattern(ConstantesVerificacion.VERIFICACION.PATTERN.PROVINCIA_VERIFICACION_COLLECTION)
  async provinciaCollection(@Payload() paginacion: FilterDto<ProvinciaFilterInput>) {
    return await this.provinciaService.getCollection(paginacion);
  }

  @MessagePattern(ConstantesVerificacion.VERIFICACION.PATTERN.PROVINCIA_VERIFICACION_BY_ID)
  async provincia(@Payload() filter: FilterById) {
    return await this.provinciaService.findById(filter);
  }
}