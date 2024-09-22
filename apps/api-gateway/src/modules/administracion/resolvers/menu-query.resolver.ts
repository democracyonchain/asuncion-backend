import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    CurrentUserWithToken,
    GlobalResultType,
    LogGwInterceptor,
    RespuestaJWTToken,
    StringOrderInput
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { MenuService } from '../services/menu.service';
import MenuCollectionType, { MenuAdministracionType } from '../dto/objecType/menu.object';
import { MenuCreateInput, MenuUpdateInput } from '../dto/inputType/menu.input';
import { MenuFilterInput } from '../dto/filterType/menu.filter';
  
  
/**
 * Clase para publicación de todos los servicios de menú
 *
 * @export
 * @class MenuQueryResolver
 * @typedef {MenuQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class MenuQueryResolver {
  
  constructor(private readonly menuService: MenuService) { }

  /**
   * Servicio para creación de un menú
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {MenuCreateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminMenuCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => MenuCreateInput })
    dataInput: MenuCreateInput,
  ) {
      return await this.menuService.menuCreate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para actualización de un menú
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {MenuUpdateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminMenuUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => MenuUpdateInput })
    dataInput: MenuUpdateInput,
  ) {
      return await this.menuService.menuUpdate(dataInput,usuarioAuth);
  }

  /**
   * Servicio para eliminación de un menú
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminMenuDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
      return await this.menuService.menuDelete(id,usuarioAuth);
  }

  /**
   * Servicio que permite obtener la colección de los menus con los respectivos filtros
   *
   * @public
   * @async
   * @param {*} info
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {ConnectionInput} pagination
   * @param {?MenuFilterInput} [where]
   * @param {?StringOrderInput} [order]
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => MenuCollectionType, { nullable: true })
  public async adminMenuCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: MenuFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.menuService.menuCollection(pagination, where, order, fields, usuarioAuth);
  }

  /**
   * Servicio para traer datos de menú con el id de parametro
   *
   * @public
   * @async
   * @param {*} info
   * @param {number} id
   * @param {RespuestaJWTToken} usuarioAuth
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Query(() => MenuAdministracionType, { nullable: false })
  public async adminMenu(
    @Info() info,
    @Args('id', { nullable: false, type: () => Int }) id: number,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
  ) {
    const fields = fieldsMap(info);
    return await this.menuService.menu(id, fields, usuarioAuth);
  }
}