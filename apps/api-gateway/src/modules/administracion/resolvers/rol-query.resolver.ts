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
import RolCollectionType, { RolType } from '../dto/objecType/rol.object';
import { RolCreateInput, RolUpdateInput } from '../dto/inputType/rol.input';
import { RolService } from '../services/rol.service';
import { RolFilterInput } from '../dto/filterType/rol.filter';
  
  
/**
 * Clase para publicación de todos los servicios de rol
 *
 * @export
 * @class RolQueryResolver
 * @typedef {RolQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class RolQueryResolver {
  
  constructor(private readonly rolService: RolService) { }

  /**
   * Servicio para creación de roles
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {RolCreateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminRolCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => RolCreateInput })
    dataInput: RolCreateInput,
  ) {
      return await this.rolService.rolCreate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para actualización de roles
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {RolUpdateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminRolUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => RolUpdateInput })
    dataInput: RolUpdateInput,
  ) {
      return await this.rolService.rolUpdate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para eliminar un rol
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminRolDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
      return await this.rolService.rolDelete(id,usuarioAuth);
  }

  /**
   * Servicio para traer la colección de los roles con sus respectivos filtros
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?RolFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => RolCollectionType, { nullable: true })
  public async adminRolCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: RolFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.rolService.rolCollection(pagination, where, order, fields, usuarioAuth);
  }


  /**
   * Servicio para traer datos del rol por el campo id
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => RolType, { nullable: false })
  public async adminRol(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.rolService.rol(id, fields, usuarioAuth);
  }
}