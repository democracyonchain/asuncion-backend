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
import { ProvinciaFilterInput } from '../dto/filterType/provincia.filter';
import ProvinciaCollectionType, { ProvinciaAdministracionType } from '../dto/objecType/provincia.object';
import { ProvinciaService } from '../services/provincia.service';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class ProvinciaQueryResolver {
  
  constructor(private readonly provinciaService: ProvinciaService) { }

  @UseGuards(AuthGuard)
  @Query(() => ProvinciaCollectionType, { nullable: true })
  public async provinciaCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ProvinciaFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.provinciaService.provinciaCollection(pagination, where, order, fields, usuarioAuth);
  }


  @UseGuards(AuthGuard)
  @Query(() => ProvinciaAdministracionType, { nullable: false })
  public async provincia(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.provinciaService.provincia(id, fields, usuarioAuth);
  }
}