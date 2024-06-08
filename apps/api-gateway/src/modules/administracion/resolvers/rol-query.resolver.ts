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
import RolCollectionType, { RolType } from '../dto/objecType/rol.object';
import { RolCreateInput, RolUpdateInput } from '../dto/inputType/rol.input';
import { RolService } from '../services/rol.service';
import { RolFilterInput } from '../dto/filterType/rol.filter';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class RolQueryResolver {
  
  constructor(private readonly rolService: RolService) { }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async rolCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => RolCreateInput })
    dataInput: RolCreateInput,
  ) {
      return await this.rolService.rolCreate(dataInput,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async rolUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => RolUpdateInput })
    dataInput: RolUpdateInput,
  ) {
      return await this.rolService.rolUpdate(dataInput,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async rolDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
      return await this.rolService.rolDelete(id,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => RolCollectionType, { nullable: true })
  public async rolCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: RolFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.rolService.rolCollection(pagination, where, order, fields, usuarioAuth);
  }


  @UseGuards(AuthGuard)
  @Query(() => RolType, { nullable: false })
  public async rol(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.rolService.rol(id, fields, usuarioAuth);
  }
}