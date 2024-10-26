import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    LogGwInterceptor,
    GlobalResultType,
    StringOrderInput,
    CurrentUserWithToken,
    RespuestaJWTToken
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { EstablecimientoCreateInput, EstablecimientoUpdateInput } from '../dto/inputType/establecimiento.input';
import { EstablecimientoService } from '../services/establecimiento.service';
import EstablecimientoCollectionType, { EstablecimientoAdminitracionType } from '../dto/objecType/establecimiento.object';
import { EstablecimientoFilterInput } from '../dto/filterType/establecimiento.filter';
  
  
/**
 * Clase para publicación de todos los servicios de establecimiento
 *
 * @export
 * @class EstablecimientoQueryResolver
 * @typedef {EstablecimientoQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class EstablecimientoQueryResolver {
  
  constructor(private readonly establecimientoService: EstablecimientoService) { }

  /**
   * Servicio para la creación de un establecimiento
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {EstablecimientoCreateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminEstablecimientoCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => EstablecimientoCreateInput })
    dataInput: EstablecimientoCreateInput,
  ) {
      return await this.establecimientoService.establecimientoCreate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para la actualización de un establecimiento
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {EstablecimientoUpdateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminEstablecimientoUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => EstablecimientoUpdateInput })
    dataInput: EstablecimientoUpdateInput,
  ) {
        return await this.establecimientoService.establecimientoUpdate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para eliminar un establecimiento
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminEstablecimientoDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
      return await this.establecimientoService.establecimientoDelete(id,usuarioAuth);
  }

  /**
   * Servicio para la colección de un establecimiento con sus respectivos filtros
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?EstablecimientoFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => EstablecimientoCollectionType, { nullable: true })
  public async adminEstablecimientoCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: EstablecimientoFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.establecimientoService.establecimientoCollection(pagination, where, order, fields, usuarioAuth);
  }


  /**
   * Servicio para consultar un establecimiento por id
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => EstablecimientoAdminitracionType, { nullable: false })
  public async adminEstablecimiento(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.establecimientoService.establecimiento(id, fields, usuarioAuth);
  }
}