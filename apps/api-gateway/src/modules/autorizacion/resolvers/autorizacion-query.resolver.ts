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
  
  
  
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()

  export class AutorizacionQueryResolver {
   
    constructor(private readonly autorizacionService: AutorizacionService) { }


    @Query(() => LoginType, { nullable: false })
    public async authLogin(
      @Args('username', { nullable: false, type: () => String }) username: string,
      @Args('password', { nullable: false, type: () => String }) password: string,
    ) {
      return await this.autorizacionService.login(username,password);
    }

    @UseGuards(AuthGuard)
    @Query(() => UsuarioAuthType, { nullable: false })
    public async authPerfil(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    ) {
      const fields = fieldsMap(info);
      return await this.autorizacionService.perfil(usuarioAuth,fields);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    public async authCambioPassword(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('password', { nullable: false, type: () => String }) password: string,
      @Args('id', { nullable: true, type: () => Int }) id: number,
    ) {
      return await this.autorizacionService.cambioPassword(usuarioAuth,password,id);
    }

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

    @UseGuards(AuthGuard)
    @Query(() => GlobalResultType, { nullable: false })
    public async authLogout(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    ) {
      return await this.autorizacionService.authlogout(usuarioAuth);
    }
  }