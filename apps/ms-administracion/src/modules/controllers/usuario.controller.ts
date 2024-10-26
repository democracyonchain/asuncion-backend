import { AllRpcExceptionMsFilter, FilterById, FilterDto, LogMsInterceptor, PayloadData } from '@bsc/core';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { UsuarioDTO, UsuarioFilterInput } from '../dto/usuario.dto';
import { UsuarioService } from '../services/usuario.service';

/**
 * Clase controlador con funciones de usuario a ser usados por el api-gateway
 *
 * @export
 * @class UsuarioController
 * @typedef {UsuarioController}
 */
@UseFilters(AllRpcExceptionMsFilter)
@UseInterceptors(LogMsInterceptor)
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  /**
   * Controlador para colección de usuarios
   *
   * @async
   * @param {FilterDto<UsuarioFilterInput>} paginacion
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_COLLECTION)
  async usuarioCollection(@Payload() paginacion: FilterDto<UsuarioFilterInput>) {
    return await this.usuarioService.getCollection(paginacion);
  }

  /**
   * Controlador para traer información de usuario por id
   *
   * @async
   * @param {FilterById} filter
   * @returns {unknown}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_BY_ID)
  async usuario(@Payload() filter: FilterById) {
    return await this.usuarioService.findById(filter);
  }

  /**
   * Controlador para creación de usuario
   *
   * @param {PayloadData<UsuarioDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_CREATE)
  usuarioCreate(@Payload() params: PayloadData<UsuarioDTO>) {
      return this.usuarioService.create(params);
  }

  /**
   * Controlador para actualización de usuario
   *
   * @param {PayloadData<UsuarioDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_UPDATE)
  usuarioUpdate(@Payload() params: PayloadData<UsuarioDTO>) {
      return this.usuarioService.update(params);
  }

  /**
   * Controlador para eliminación de usuario
   *
   * @param {PayloadData<UsuarioDTO>} params
   * @returns {*}
   */
  @MessagePattern(ConstantesAdministracion.ADMINISTRACION.PATTERN.USUARIO_DELETE)
  usuarioDelete(@Payload() params: PayloadData<UsuarioDTO>) {
      return this.usuarioService.delete(params);
  }
}
