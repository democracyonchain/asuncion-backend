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
import ModuloCollectionType, { ModuloAdministracionType } from '../dto/objecType/modulo.object';
import { ModuloCreateInput, ModuloUpdateInput } from '../dto/inputType/modulo.input';
import { ModuloService } from '../services/modulo.service';
import { ModuloFilterInput } from '../dto/filterType/modulo.filter';
  
  
  /**
   * Clase para publicación de todos los servicios de modulo
   *
   * @export
   * @class ModuloQueryResolver
   * @typedef {ModuloQueryResolver}
   */
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()
  export class ModuloQueryResolver {
   
    constructor(private readonly moduloService: ModuloService) { }

    /**
     * Servicio para crear modulos
     *
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {ModuloCreateInput} dataInput
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminModuloCreate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => ModuloCreateInput })
      dataInput: ModuloCreateInput,
    ) {
        return await this.moduloService.moduloCreate(dataInput,usuarioAuth);
    }

    /**
     * Servicio para actualizar modulos
     *
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {ModuloUpdateInput} dataInput
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminModuloUpdate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => ModuloUpdateInput })
      dataInput: ModuloUpdateInput,
    ) {
        return await this.moduloService.moduloUpdate(dataInput,usuarioAuth);
    }

    /**
     * Servicio para eliminar modulos
     *
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {number} id
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminModuloDelete(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
        return await this.moduloService.moduloDelete(id,usuarioAuth);
    }

    /**
     * Servicio para obtener la colección de los modulos con sus respectivo filtros
     *
     * @public
     * @async
     * @param {*} info
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {ConnectionInput} pagination
     * @param {?ModuloFilterInput} [where]
     * @param {?StringOrderInput} [order]
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => ModuloCollectionType, { nullable: true })
    public async adminModuloCollection(
        @Info() info,
        @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
        @Args('pagination', { nullable: true }) pagination: ConnectionInput,
        @Args('where', { nullable: true }) where?: ModuloFilterInput,
        @Args('order', { nullable: true }) order?: StringOrderInput,
    ) {
        const fields = fieldsMap(info);
        return await this.moduloService.moduloCollection(pagination, where, order, fields, usuarioAuth);
    }

    /**
     * Servicio para traer información de un modulo con le id de parametro
     *
     * @public
     * @async
     * @param {*} info
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {number} id
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => ModuloAdministracionType, { nullable: false })
    public async adminModulo(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
      const fields = fieldsMap(info);
      return await this.moduloService.modulo(id, fields, usuarioAuth);
    }
  }