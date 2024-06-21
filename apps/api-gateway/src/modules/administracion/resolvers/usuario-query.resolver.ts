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
  
  
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()

  export class UsuarioQueryResolver {
   
    constructor(private readonly usuarioService: UsuarioService) { }


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

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminUsuarioCreate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => UsuarioCreateInput })
      dataInput: UsuarioCreateInput,
    ) {
      return await this.usuarioService.usuarioCreate(dataInput,usuarioAuth);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminUsuarioUpdate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => UsuarioUpdateInput })
      dataInput: UsuarioUpdateInput,
    ) {
        return await this.usuarioService.usuarioUpdate(dataInput,usuarioAuth);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminUsuarioDelete(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
        return await this.usuarioService.usuarioDelete(id,usuarioAuth);
    }
  }