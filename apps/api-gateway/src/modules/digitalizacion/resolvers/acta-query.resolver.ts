import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    LogGwInterceptor,
    CurrentUserWithToken,
    RespuestaJWTToken
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { ActaService } from '../services/acta.service';
import { ActaDigitalizacionVotoType } from '../dto/objecType/acta.object';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class ActaQueryResolver {
  
  constructor(private readonly actaService: ActaService) { }

  @UseGuards(AuthGuard)
  @Query(() => ActaDigitalizacionVotoType, { nullable: false })
  public async digtActaByJuntaList(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('junta_id', { nullable: false, type: () => Int }) junta_id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.actaService.actaByJunta(junta_id, fields, usuarioAuth);
  }
}