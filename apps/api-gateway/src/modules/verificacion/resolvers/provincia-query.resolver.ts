import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    LogGwInterceptor,
    StringOrderInput,
    CurrentUserWithToken,
    RespuestaJWTToken
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { ProvinciaVerificacionFilterInput } from '../dto/filterType/provincia.filter';
import ProvinciaVerificacionCollectionType, { ProvinciaVerificacionType } from '../dto/objecType/provincia.object';
import { ProvinciaService } from '../services/provincia.service';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class ProvinciaQueryResolver {
  
  constructor(private readonly provinciaService: ProvinciaService) { }

  @UseGuards(AuthGuard)
  @Query(() => ProvinciaVerificacionCollectionType, { nullable: true })
  public async vrfProvinciaVerificacionCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ProvinciaVerificacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.provinciaService.provinciaCollection(pagination, where, order, fields, usuarioAuth);
  }


  @UseGuards(AuthGuard)
  @Query(() => ProvinciaVerificacionType, { nullable: false })
  public async vrfProvinciaVerificacion(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.provinciaService.provincia(id, fields, usuarioAuth);
  }
}