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
import { Args, Info, Int, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { ProvinciaVerificacionFilterInput } from '../dto/filterType/provincia.filter';
import ProvinciaVerificacionCollectionType, { ProvinciaVerificacionType } from '../dto/objecType/provincia.object';
import { ProvinciaService } from '../services/provincia.service';
  
  
/**
 * Clase para publicación de todos los servicios de provincia
 *
 * @export
 * @class ProvinciaQueryResolver
 * @typedef {ProvinciaQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class ProvinciaQueryResolver {
  
  constructor(private readonly provinciaService: ProvinciaService) { }

  /**
   * Servicio para obtener la colección de provincia con sus respectivos parametros
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?ProvinciaVerificacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => ProvinciaVerificacionCollectionType, { nullable: true })
  public async vrfProvinciaVerificacionCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ProvinciaVerificacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.provinciaService.provinciaCollection(pagination, where, order, fields, usuarioAuth);
  }


  /**
   * Servicio para traer información de provincia con el id de parametro
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => ProvinciaVerificacionType, { nullable: false })
  public async vrfProvinciaVerificacion(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.provinciaService.provincia(id, fields, usuarioAuth);
  }
}