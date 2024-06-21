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
import { EstablecimientoCreateInput, EstablecimientoUpdateInput } from '../dto/inputType/establecimiento.input';
import { EstablecimientoService } from '../services/establecimiento.service';
import EstablecimientoCollectionType, { EstablecimientoAdminitracionType } from '../dto/objecType/establecimiento.object';
import { EstablecimientoFilterInput } from '../dto/filterType/establecimiento.filter';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class EstablecimientoQueryResolver {
  
  constructor(private readonly establecimientoService: EstablecimientoService) { }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminEstablecimientoCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => EstablecimientoCreateInput })
    dataInput: EstablecimientoCreateInput,
  ) {
      return await this.establecimientoService.establecimientoCreate(dataInput,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminEstablecimientoUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => EstablecimientoUpdateInput })
    dataInput: EstablecimientoUpdateInput,
  ) {
        return await this.establecimientoService.establecimientoUpdate(dataInput,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async adminEstablecimientoDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
      return await this.establecimientoService.establecimientoDelete(id,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => EstablecimientoCollectionType, { nullable: true })
  public async adminEstablecimientoCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: EstablecimientoFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.establecimientoService.establecimientoCollection(pagination, where, order, fields, usuarioAuth);
  }


  @UseGuards(AuthGuard)
  @Query(() => EstablecimientoAdminitracionType, { nullable: false })
  public async adminEstablecimiento(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.establecimientoService.establecimiento(id, fields, usuarioAuth);
  }
}