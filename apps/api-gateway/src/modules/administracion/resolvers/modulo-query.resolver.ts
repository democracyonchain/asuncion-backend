import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    CurrentUser,
    LogGwInterceptor,
    MutatioResult,
    RespuestaJWT,
    StringOrderInput
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { fieldsMap } from 'graphql-fields-list';
import ModuloCollectionType, { ModuloAdministracionType, ModuloDeleteType } from '../dto/objecType/modulo.object';
import { ModuloCreateInput, ModuloUpdateInput } from '../dto/inputType/modulo.input';
import { ModuloService } from '../services/modulo.service';
import { ModuloFilterInput } from '../dto/filterType/modulo.filter';
  
  
  @UseFilters(AllHttpExceptionGwFilter)
  @UseInterceptors(LogGwInterceptor)
  @Resolver()

  export class ModuloQueryResolver {
   
    constructor(private readonly moduloService: ModuloService) { }

    @UseGuards(AuthGuard)
    @Mutation(() => ModuloAdministracionType, { nullable: true })
    async moduloCreate(
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('dataInput', { type: () => ModuloCreateInput })
      dataInput: ModuloCreateInput,
    ) {
        const modulo = await this.moduloService.moduloCreate(dataInput,usuarioAuth);
        return plainToClass(ModuloAdministracionType, modulo);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ModuloAdministracionType, { nullable: true })
    async moduloUpdate(
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('dataInput', { type: () => ModuloUpdateInput })
      dataInput: ModuloUpdateInput,
    ) {
        const modulo = await this.moduloService.moduloUpdate(dataInput,usuarioAuth);
        return plainToClass(ModuloAdministracionType, modulo);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ModuloDeleteType, { nullable: true })
    async moduloDelete(
      @CurrentUser() usuarioAuth: RespuestaJWT,
      @Args('id', { nullable: true, type: () => Int }) id: number,
    ) {
        return await this.moduloService.moduloDelete(id,usuarioAuth);
    }

    @UseGuards(AuthGuard)
    @Query(() => ModuloCollectionType, { nullable: true })
    public async moduloCollection(
        @Info() info,
        @Args('pagination', { nullable: true }) pagination: ConnectionInput,
        @Args('where', { nullable: true }) where?: ModuloFilterInput,
        @Args('order', { nullable: true }) order?: StringOrderInput,
    ) {
        const fields = fieldsMap(info);
        const moduloCollection = await this.moduloService.moduloCollection(pagination, where, order, fields);
        return moduloCollection;
    }

    @UseGuards(AuthGuard)
    @Query(() => ModuloAdministracionType, { nullable: false })
    public async modulo(
      @Info() info,
      @Args('id', { nullable: true, type: () => Number }) id: number,
    ) {
      const fields = fieldsMap(info);
      const dataModuloById = await this.moduloService.modulo(id, fields);
      return dataModuloById;
    }
  }