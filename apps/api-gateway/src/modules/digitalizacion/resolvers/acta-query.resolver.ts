import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    LogGwInterceptor,
    CurrentUserWithToken,
    RespuestaJWTToken,
    GlobalResultType,
    ConnectionInput,
    StringOrderInput
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { ActaService } from '../services/acta.service';
import ActaDigitalizacionBasicCollectionType, { ActaDigitalizacionVotoImagenType, ActaDigitalizacionVotoType } from '../dto/objecType/acta.object';
import { ActaUpdateInput } from '../dto/inputType/acta.input';
import { ActaDigitalizacionFilterInput } from '../dto/filterType/acta.filter';
  
  
/**
 * Clase para publicación de todos los servicios de acta
 *
 * @export
 * @class ActaQueryResolver
 * @typedef {ActaQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class ActaQueryResolver {
  
  constructor(private readonly actaService: ActaService) { }

  /**
   * Servicio para consultar un acta en función de la junta y dignidad
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} junta_id
   * @param {number} dignidad_id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => ActaDigitalizacionVotoType, { nullable: false })
  public async digtActaByJuntaList(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('junta_id', { nullable: false, type: () => Int }) junta_id: number,
    @Args('dignidad_id', { nullable: false, type: () => Int }) dignidad_id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.actaService.actaByJunta(junta_id, dignidad_id,fields, usuarioAuth);
  }

  /**
   * Servicio para traer un acta al azar en función de la dignidad
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} dignidad_id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => ActaDigitalizacionVotoImagenType, { nullable: false })
  public async digtActaByDignidadList(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dignidad_id', { nullable: false, type: () => Int }) dignidad_id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.actaService.actaByDignidad(dignidad_id,fields, usuarioAuth);
  }

  /**
   * Servicio para actualizar datos del acta
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ActaUpdateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async digtActaUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => ActaUpdateInput })
    dataInput: ActaUpdateInput,
  ) {
      return await this.actaService.digtActaUpdate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para obtener la colección de actas
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?ActaDigitalizacionFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => ActaDigitalizacionBasicCollectionType, { nullable: true })
  public async digitActaCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ActaDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.actaService.actaCollection(pagination, where, order, fields, usuarioAuth);
  }

  /**
   * Servicio para liberar el acta
   *
   * @public
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} dignidad_id
   * @param {number} junta_id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  public async digtActaLiberaUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dignidad_id', { nullable: false, type: () => Int }) dignidad_id: number,
    @Args('junta_id', { nullable: false, type: () => Int }) junta_id: number,
  ) {
    return await this.actaService.actaLibera(dignidad_id, junta_id, usuarioAuth);
  }
}