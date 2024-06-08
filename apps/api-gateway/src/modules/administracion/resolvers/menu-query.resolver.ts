import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    CurrentUserWithToken,
    GlobalResultType,
    LogGwInterceptor,
    RespuestaJWTToken,
    StringOrderInput
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { fieldsMap } from 'graphql-fields-list';
import { MenuService } from '../services/menu.service';
import MenuCollectionType, { MenuAdministracionType } from '../dto/objecType/menu.object';
import { MenuCreateInput, MenuUpdateInput } from '../dto/inputType/menu.input';
import { MenuFilterInput } from '../dto/filterType/menu.filter';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class MenuQueryResolver {
  
  constructor(private readonly menuService: MenuService) { }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async menuCreate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => MenuCreateInput })
    dataInput: MenuCreateInput,
  ) {
      return await this.menuService.menuCreate(dataInput,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async menuUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => MenuUpdateInput })
    dataInput: MenuUpdateInput,
  ) {
      return await this.menuService.menuUpdate(dataInput,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async menuDelete(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
      return await this.menuService.menuDelete(id,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => MenuCollectionType, { nullable: true })
  public async menuCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: MenuFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.menuService.menuCollection(pagination, where, order, fields, usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => MenuAdministracionType, { nullable: false })
  public async menu(
    @Info() info,
    @Args('id', { nullable: false, type: () => Int }) id: number,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
  ) {
    const fields = fieldsMap(info);
    return await this.menuService.menu(id, fields, usuarioAuth);
  }
}