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
import { UsuarioService } from '../services/usuario.service';
import { UsuarioFilterInput } from '../dto/filterType/usuario.filter';
import UsuarioCollectionType, { UsuarioAdministracionType } from '../dto/objecType/usuario.object';
import { UsuarioCreateInput, UsuarioUpdateInput } from '../dto/inputType/usuario.input';
import { fieldsMap } from 'graphql-fields-list';
  
  
  /**
   * Clase para publicación de los servicios de usuario
   *
   * @export
   * @class UsuarioQueryResolver
   * @typedef {UsuarioQueryResolver}
   */
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()
  export class UsuarioQueryResolver {
   
    constructor(private readonly usuarioService: UsuarioService) { }


    /**
     * Servicio de colección del usuario con sus respectivos filtros
     *
     * @public
     * @async
     * @param {*} info
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {ConnectionInput} pagination
     * @param {?UsuarioFilterInput} [where]
     * @param {?StringOrderInput} [order]
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => UsuarioCollectionType, { nullable: true })
    public async adminUsuarioCollection(
        @Info() info,
        @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
        @Args('pagination', { nullable: true }) pagination: ConnectionInput,
        @Args('where', { nullable: true }) where?: UsuarioFilterInput,
        @Args('order', { nullable: true }) order?: StringOrderInput,
    ) {
        const fields = fieldsMap(info);
        return await this.usuarioService.usuarioCollection(pagination, where, order, fields, usuarioAuth);
    }

    /**
     * Servicio para traer datos del usuario usando el campo id
     *
     * @public
     * @async
     * @param {*} info
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {number} id
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => UsuarioAdministracionType, { nullable: false })
    public async adminUsuario(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
      const fields = fieldsMap(info);
      return await this.usuarioService.usuario(id, fields, usuarioAuth);
    }

    /**
     * Servicio para crear usaurio
     *
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {UsuarioCreateInput} dataInput
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminUsuarioCreate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => UsuarioCreateInput })
      dataInput: UsuarioCreateInput,
    ) {
      return await this.usuarioService.usuarioCreate(dataInput,usuarioAuth);
    }

    /**
     * Servicio para actualizar usuario
     *
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {UsuarioUpdateInput} dataInput
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminUsuarioUpdate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => UsuarioUpdateInput })
      dataInput: UsuarioUpdateInput,
    ) {
        return await this.usuarioService.usuarioUpdate(dataInput,usuarioAuth);
    }

    /**
     * Servicio para eliminar usuario
     *
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {number} id
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminUsuarioDelete(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
        return await this.usuarioService.usuarioDelete(id,usuarioAuth);
    }
  }