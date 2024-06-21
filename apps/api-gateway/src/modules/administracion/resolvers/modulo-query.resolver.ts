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
  
  
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()

  export class ModuloQueryResolver {
   
    constructor(private readonly moduloService: ModuloService) { }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminModuloCreate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => ModuloCreateInput })
      dataInput: ModuloCreateInput,
    ) {
        return await this.moduloService.moduloCreate(dataInput,usuarioAuth);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminModuloUpdate(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('dataInput', { type: () => ModuloUpdateInput })
      dataInput: ModuloUpdateInput,
    ) {
        return await this.moduloService.moduloUpdate(dataInput,usuarioAuth);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => GlobalResultType, { nullable: false })
    async adminModuloDelete(
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('id', { nullable: false, type: () => Int }) id: number,
    ) {
        return await this.moduloService.moduloDelete(id,usuarioAuth);
    }

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