import { AllRpcExceptionMsFilter, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { VotosDigitalizacionDTO } from '../dto/votos.dto';
import { VotosService } from '../services/votos.service';

/**
 * Clase controlador con funciones de votos a ser usados por el api-gateway
 *
 * @export
 * @class VotosController
 * @typedef {VotosController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('votos')
export class VotosController {
  constructor(private votosService: VotosService) {}

  /**
   * Controlador para actualizar votos
   *
   * @param {PayloadData<VotosDigitalizacionDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesDigitalizacion.DIGITALIZACION.PATTERN.VOTOS_UPDATE_DIG_DIGITALIZACION)
  votosUpdate(@Payload() params: PayloadData<VotosDigitalizacionDTO>) {
      return this.votosService.updateVotosDigitalizacion(params);
  }
}