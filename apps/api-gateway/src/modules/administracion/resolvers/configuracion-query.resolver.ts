import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    LogGwInterceptor,
    StringOrderInput,
    CurrentUserWithToken,
    RespuestaJWTToken
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import ConfiguracionCollectionType from '../dto/objecType/configuracion.object';
import { ConfiguracionFilterInput } from '../dto/filterType/configuracion.filter';
import { ConfiguracionService } from '../services/configuracion.service';
  
  
/**
 * Clase para publicación de todos los servicios de configuración
 *
 * @export
 * @class ConfiguracionQueryResolver
 * @typedef {ConfiguracionQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class ConfiguracionQueryResolver {
  
  constructor(private readonly configuracionService: ConfiguracionService) { }

  /**
   * Servicio para colección de la tabla de configuración con los respectivos filtros
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?ConfiguracionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => ConfiguracionCollectionType, { nullable: true })
  public async adminConfiguracionCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ConfiguracionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.configuracionService.configuracionCollection(pagination, where, order, fields, usuarioAuth);
  }
}