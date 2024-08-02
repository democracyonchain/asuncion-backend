import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ProvinciaFilterInput } from '../dto/provincia.dto';
import { LocalidadesService } from '../services/localidades.service';
import { CantonFilterInput } from '../dto/canton.dto';
import { ParroquiaFilterInput } from '../dto/parroquia.dto';
import { ZonaFilterInput } from '../dto/zona.dto';
import { JuntaFilterInput } from '../dto/junta.dto';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('localidades')
export class LocalidadesController {
  constructor(private localidadesService: LocalidadesService) {}

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_COLLECTION)
  async provinciaCollection(@Payload() paginacion: FilterDto<ProvinciaFilterInput>) {
    return await this.localidadesService.getCollectionProvincia(paginacion);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.PROVINCIA_DIGITALIZACION_BY_ID)
  async provincia(@Payload() filter: FilterById) {
    return await this.localidadesService.findByIdProvincia(filter);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.CANTON_DIGITALIZACION_COLLECTION)
  async cantonCollection(@Payload() paginacion: FilterDto<CantonFilterInput>) {
    return await this.localidadesService.getCollectionCanton(paginacion);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.PARROQUIA_DIGITALIZACION_COLLECTION)
  async parroquiaCollection(@Payload() paginacion: FilterDto<ParroquiaFilterInput>) {
    return await this.localidadesService.getCollectionParroquia(paginacion);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.ZONA_DIGITALIZACION_COLLECTION)
  async zonaCollection(@Payload() paginacion: FilterDto<ZonaFilterInput>) {
    return await this.localidadesService.getCollectionZona(paginacion);
  }

  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.JUNTA_DIGITALIZACION_COLLECTION)
  async juntaCollection(@Payload() paginacion: FilterDto<JuntaFilterInput>) {
    return await this.localidadesService.getCollectionJunta(paginacion);
  }
}