import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    CurrentUser,
    LogGwInterceptor,
    RespuestaJWT,
    StringOrderInput
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioFilterInput } from '../dto/filterType/usuario.filter';
import UsuarioCollectionType, { UsuarioAdministracionType, UsuarioDeleteType } from '../dto/objecType/usuario.object';
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
        @Args('pagination', { nullable: true }) pagination: ConnectionInput,
        @Args('where', { nullable: true }) where?: UsuarioFilterInput,
        @Args('order', { nullable: true }) order?: StringOrderInput,
    ) {
        const fields = fieldsMap(info);
        const usuarioCollection = await this.usuarioService.usuarioCollection(pagination, where, order, fields);
        return usuarioCollection;
    }

    @UseGuards(AuthGuard)
    @Query(() => UsuarioAdministracionType, { nullable: false })
    public async usuario(
      @Info() info,
      @Args('id', { nullable: true, type: () => Number }) id: number,
    ) {
      const fields = fieldsMap(info);
      const dataUsuarioById = await this.usuarioService.usuario(id, fields);
      return dataUsuarioById;
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UsuarioAdministracionType, { nullable: true })
    async usuarioCreate(
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('dataInput', { type: () => UsuarioCreateInput })
      dataInput: UsuarioCreateInput,
    ) {
      const usuario = await this.usuarioService.usuarioCreate(dataInput,usuarioAuth);
      return plainToClass(UsuarioAdministracionType, usuario);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UsuarioAdministracionType, { nullable: true })
    async usuarioUpdate(
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('dataInput', { type: () => UsuarioUpdateInput })
      dataInput: UsuarioUpdateInput,
    ) {
        const usuario = await this.usuarioService.usuarioUpdate(dataInput,usuarioAuth);
        return plainToClass(UsuarioAdministracionType, usuario);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UsuarioDeleteType, { nullable: true })
    async usuarioDelete(
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('id', { nullable: true, type: () => Int }) id: number,
    ) {
        return await this.usuarioService.usuarioDelete(id,usuarioAuth);
    }
  }