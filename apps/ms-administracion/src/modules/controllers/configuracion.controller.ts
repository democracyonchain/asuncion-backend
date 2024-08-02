import { AllRpcExceptionMsFilter, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { ConfiguracionFilterInput } from '../dto/configuracion.dto';
import { ConfiguracionService } from '../services/configuracion.service';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('configuracion')
export class ConfiguracionController {
  constructor(private configuracionService: ConfiguracionService) {}

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.CONFIGURACION_COLLECTION)
  async configuracionCollection(@Payload() paginacion: FilterDto<ConfiguracionFilterInput>) {
    return await this.configuracionService.getCollection(paginacion);
  }
}