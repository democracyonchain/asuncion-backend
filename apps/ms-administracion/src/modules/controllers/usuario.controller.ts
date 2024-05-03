import { AllRpcExceptionMsFilter, FilterById, FilterByIdUser, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { UsuarioDTO, UsuarioFilterInput } from '../dto/usuario.dto';
import { UsuarioService } from '../services/usuario.service';

@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_COLLECTION)
  async usuarioCollection(@Payload() paginacion: FilterDto<UsuarioFilterInput>) {
    const data = await this.usuarioService.getCollection(paginacion);
    return data;
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_BY_ID)
  async usuario(@Payload() filter: FilterById) {
    const data = await this.usuarioService.findById(filter);
    return data;
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_CREATE)
  usuarioCreate(@Payload() params: PayloadData<UsuarioDTO>) {
      return this.usuarioService.create(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_UPDATE)
  usuarioUpdate(@Payload() params: PayloadData<UsuarioDTO>) {
      return this.usuarioService.update(params);
  }

  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_DELETE)
  usuarioDelete(@Payload() params: PayloadData<UsuarioDTO>) {
      return this.usuarioService.delete(params);
  }
}
