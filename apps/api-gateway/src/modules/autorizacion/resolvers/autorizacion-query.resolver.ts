import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    CurrentUserWithToken,
    GlobalResultType,
    LogGwInterceptor,
    RespuestaJWTToken,
  } from '@bsc/core';
  import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
  import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
  import { AutorizacionService } from '../services/autorizacion.service';
import { LoginType } from '../dto/objecType/login.object';
import { fieldsMap } from 'graphql-fields-list';
import { UsuarioAuthType } from '../dto/objecType/usuario.object';
import { ModuloAuthType } from '../dto/objecType/modulo.object';
  
  
  
  /**
   * Clase para publicación de todos los servicios de autorización
   *
   * @export
   * @class AutorizacionQueryResolver
   * @typedef {AutorizacionQueryResolver}
   */
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()
  export class AutorizacionQueryResolver {
   
    constructor(private readonly autorizacionService: AutorizacionService) { }


    /**
     * Servicio para logearse y obtener el token
     *
     * @public
     * @async
     * @param {string} username
     * @param {string} password
     * @returns {unknown}
     */
    @Query(() => LoginType, { nullable: false })
    public async authLogin(
      @Args('username', { nullable: false, type: () => String }) username: string,
      @Args('password', { nullable: false, type: () => String }) password: string,
    ) {
      return await this.autorizacionService.login(username,password);
    }

    /**
     * Servicio para obtener los roles asociados al token
     *
     * @public
     * @async
     * @param {*} info
     * @param {RespuestaJWTToken} usuarioAuth
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => UsuarioAuthType, { nullable: false })
    public async authPerfil(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    ) {
      const fields = fieldsMap(info);
      return await this.autorizacionService.perfil(usuarioAuth,fields);
    }

    /**
     * Servicio para actualizar el password
     *
     * @public
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {string} password
     * @param {number} id
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    public async authCambioPassword(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('password', { nullable: false, type: () => String }) password: string,
      @Args('id', { nullable: true, type: () => Int }) id: number,
    ) {
      return await this.autorizacionService.cambioPassword(usuarioAuth,password,id);
    }

    /**
     * Servicios para obtener los permisos por un rol especifico
     *
     * @public
     * @async
     * @param {*} info
     * @param {RespuestaJWTToken} usuarioAuth
     * @param {number} rol_id
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => [ModuloAuthType], { nullable: false })
    public async authModuloPermisosId(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('rol_id', { nullable: false, type: () => Int }) rol_id: number,
    ) {
      const fields = fieldsMap(info);
      return await this.autorizacionService.moduloPermiso(usuarioAuth,fields,rol_id);
    }

    /**
     * Servicio para deslogearse
     *
     * @public
     * @async
     * @param {RespuestaJWTToken} usuarioAuth
     * @returns {unknown}
     */
    @UseGuards(AuthGuard)
    @Query(() => GlobalResultType, { nullable: false })
    public async authLogout(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    ) {
      return await this.autorizacionService.authlogout(usuarioAuth);
    }
  }