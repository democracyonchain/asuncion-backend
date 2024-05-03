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
import RolCollectionType, { RolAdministracionType, RolDeleteType, RolType } from '../dto/objecType/rol.object';
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
    @CurrentUser() usuarioAuth: RespuestaJWT,
    @Args('dataInput', { type: () => RolCreateInput })
    dataInput: RolCreateInput,
  ) {
      const menu = await this.rolService.rolCreate(dataInput,usuarioAuth);
      return plainToClass(RolAdministracionType, menu);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RolAdministracionType, { nullable: true })
  async rolUpdate(
    @CurrentUser() usuarioAuth: RespuestaJWT,
    @Args('dataInput', { type: () => RolUpdateInput })
    dataInput: RolUpdateInput,
  ) {
      const menu = await this.rolService.rolUpdate(dataInput,usuarioAuth);
      return plainToClass(RolAdministracionType, menu);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RolDeleteType, { nullable: true })
  async rolDelete(
    @CurrentUser() usuarioAuth: RespuestaJWT,
    @Args('id', { nullable: true, type: () => Int }) id: number,
  ) {
      return await this.rolService.rolDelete(id,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => RolCollectionType, { nullable: true })
  public async rolCollection(
      @Info() info,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: RolFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      const rolCollection = await this.rolService.rolCollection(pagination, where, order, fields);
      return rolCollection;
  }


  @UseGuards(AuthGuard)
  @Query(() => RolType, { nullable: false })
  public async rol(
    @Info() info,
    @Args('id', { nullable: true, type: () => Number }) id: number,
  ) {
    const fields = fieldsMap(info);
    const dataRolById = await this.rolService.rol(id, fields);
    return dataRolById;
  }
}