import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    CurrentUserWithToken,
    GlobalResultType,
    LogGwInterceptor,
    RespuestaJWTToken,
  } from '@bsc/core';
  import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
  import { Args, Info, Int, Query, Resolver } from '@nestjs/graphql';
  import { AutorizacionService } from '../services/autorizacion.service';
import { LoginType } from '../dto/objecType/login.object';
import { fieldsMap } from 'graphql-fields-list';
import { UsuarioAuthType } from '../dto/objecType/usuario.object';
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
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    ) {
      const fields = fieldsMap(info);
      const dataUsuarioById = await this.autorizacionService.perfil(usuarioAuth,fields);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Query(() => GlobalResultType, { nullable: false })
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
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('rol_id', { nullable: false, type: () => Int }) rol_id: number,
    ) {
      const fields = fieldsMap(info);
      const dataUsuarioById = await this.autorizacionService.moduloPermiso(usuarioAuth,fields,rol_id);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Query(() => GlobalResultType, { nullable: false })
    public async authlogout(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    ) {
      const result = await this.autorizacionService.authlogout(usuarioAuth);
      return result;
    }
  }