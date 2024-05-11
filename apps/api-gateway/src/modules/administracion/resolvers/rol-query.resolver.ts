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
import { plainToClass } from 'class-transformer';
import { fieldsMap } from 'graphql-fields-list';
import RolCollectionType, { RolAdministracionType, RolType } from '../dto/objecType/rol.object';
import { RolCreateInput, RolUpdateInput } from '../dto/inputType/rol.input';
import { RolService } from '../services/rol.service';
import { RolFilterInput } from '../dto/filterType/rol.filter';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class RolQueryResolver {
  
  constructor(private readonly rolService: RolService) { }

  @UseGuards(AuthGuard)
  @Mutation(() => RolAdministracionType, { nullable: true })
  async rolCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => RolCreateInput })
    dataInput: RolCreateInput,
  ) {
      const menu = await this.rolService.rolCreate(dataInput,usuarioAuth);
      return plainToClass(RolAdministracionType, menu);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RolAdministracionType, { nullable: true })
  async rolUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => RolUpdateInput })
    dataInput: RolUpdateInput,
  ) {
      const menu = await this.rolService.rolUpdate(dataInput,usuarioAuth);
      return plainToClass(RolAdministracionType, menu);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: true })
  async rolDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: true, type: () => Int }) id: number,
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
      const rolCollection = await this.rolService.rolCollection(pagination, where, order, fields, usuarioAuth);
      return rolCollection;
  }


  @UseGuards(AuthGuard)
  @Query(() => RolType, { nullable: false })
  public async rol(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: true, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    const dataRolById = await this.rolService.rol(id, fields, usuarioAuth);
    return dataRolById;
  }
}