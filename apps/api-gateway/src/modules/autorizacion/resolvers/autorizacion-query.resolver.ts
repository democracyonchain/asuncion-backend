import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    CurrentUser,
    CurrentUserWithToken,
    LogGwInterceptor,
    RespuestaJWT,
    RespuestaJWTToken,
  } from '@bsc/core';
  import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
  import { Args, Info, Query, Resolver } from '@nestjs/graphql';
  import { AutorizacionService } from '../services/autorizacion.service';
import { LoginType } from '../dto/objecType/login.object';
import { fieldsMap } from 'graphql-fields-list';
import { UsuarioAuthGlobalMessageType, UsuarioAuthType } from '../dto/objecType/usuario.object';
import { ModuloAuthType } from '../dto/objecType/modulo.object';
  
  
  
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()

  export class AutorizacionQueryResolver {
   
    constructor(private readonly autorizacionService: AutorizacionService) { }


    @Query(() => LoginType, { nullable: false })
    public async authlogin(
      @Args('username', { nullable: false, type: () => String }) username: string,
      @Args('password', { nullable: false, type: () => String }) password: string,
    ) {
      const dataUsuarioById = await this.autorizacionService.login(username,password);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Query(() => UsuarioAuthType, { nullable: false })
    public async authPerfil(
      @Info() info,
      @CurrentUser() usuarioAuth: RespuestaJWT,
    ) {
      const fields = fieldsMap(info);
      const dataUsuarioById = await this.autorizacionService.perfil(usuarioAuth,fields);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Query(() => UsuarioAuthGlobalMessageType, { nullable: false })
    public async authCambioPassword(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('password', { nullable: false, type: () => String }) password: string,
    ) {
      const dataUsuarioById = await this.autorizacionService.cambioPassword(usuarioAuth,password);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Query(() => [ModuloAuthType], { nullable: false })
    public async authModuloPermisosId(
      @Info() info,
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('rol_id', { nullable: false, type: () => Number }) rol_id: number,
    ) {
      const fields = fieldsMap(info);
      const dataUsuarioById = await this.autorizacionService.moduloPermiso(usuarioAuth,fields,rol_id);
      return dataUsuarioById;
    }
  }