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
import { plainToClass } from 'class-transformer';
import { fieldsMap } from 'graphql-fields-list';
  
  
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()

  export class UsuarioQueryResolver {
   
    constructor(private readonly usuarioService: UsuarioService) { }


    @UseGuards(AuthGuard)
    @Query(() => UsuarioCollectionType, { nullable: true })
    public async usuarioCollection(
        @Info() info,
        @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
        @Args('pagination', { nullable: true }) pagination: ConnectionInput,
        @Args('where', { nullable: true }) where?: UsuarioFilterInput,
        @Args('order', { nullable: true }) order?: StringOrderInput,
    ) {
        const fields = fieldsMap(info);
        const usuarioCollection = await this.usuarioService.usuarioCollection(pagination, where, order, fields, usuarioAuth);
        return usuarioCollection;
    }

    @UseGuards(AuthGuard)
    @Query(() => UsuarioAdministracionType, { nullable: false })
    public async usuario(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
      const fields = fieldsMap(info);
      const dataUsuarioById = await this.usuarioService.usuario(id, fields, usuarioAuth);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async usuarioCreate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => UsuarioCreateInput })
      dataInput: UsuarioCreateInput,
    ) {
      const usuario = await this.usuarioService.usuarioCreate(dataInput,usuarioAuth);
      return plainToClass(UsuarioAdministracionType, usuario);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async usuarioUpdate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => UsuarioUpdateInput })
      dataInput: UsuarioUpdateInput,
    ) {
        const usuario = await this.usuarioService.usuarioUpdate(dataInput,usuarioAuth);
        return plainToClass(UsuarioAdministracionType, usuario);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async usuarioDelete(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
        return await this.usuarioService.usuarioDelete(id,usuarioAuth);
    }
  }