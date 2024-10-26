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
import DignidadDigitalizacionCollectionType from '../dto/objecType/dignidad.object';
import { DignidadDigitalizacionFilterInput } from '../dto/filterType/dignidad.filter';
import { DignidadService } from '../services/dignidad.service';
  
  
/**
 * Clase para publicación de todos los servicios de dignidad
 *
 * @export
 * @class DignidadQueryResolver
 * @typedef {DignidadQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class DignidadQueryResolver {
  
  constructor(private readonly dignidadService: DignidadService) { }

  /**
   * Servicio para colección de dignidad con los respectivos filtros
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?DignidadDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => DignidadDigitalizacionCollectionType, { nullable: true })
  public async digtDignidadCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: DignidadDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.dignidadService.dignidadCollection(pagination, where, order, fields, usuarioAuth);
  }

}