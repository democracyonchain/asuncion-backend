import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    ConnectionInput,
    CurrentUser,
    LogGwInterceptor,
    RespuestaJWT,
    StringOrderInput
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { fieldsMap } from 'graphql-fields-list';
import { MenuService } from '../services/menu.service';
import MenuCollectionType, { MenuAdministracionType, MenuDeleteType } from '../dto/objecType/menu.object';
import { MenuCreateInput, MenuUpdateInput } from '../dto/inputType/menu.input';
import { MenuFilterInput } from '../dto/filterType/menu.filter';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class MenuQueryResolver {
  
  constructor(private readonly menuService: MenuService) { }

  @UseGuards(AuthGuard)
  @Mutation(() => MenuAdministracionType, { nullable: true })
  async menuCreate(
    @CurrentUser() usuarioAuth: RespuestaJWT,
    @Args('dataInput', { type: () => MenuCreateInput })
    dataInput: MenuCreateInput,
  ) {
      const menu = await this.menuService.menuCreate(dataInput,usuarioAuth);
      return plainToClass(MenuAdministracionType, menu);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => MenuAdministracionType, { nullable: true })
  async menuUpdate(
    @CurrentUser() usuarioAuth: RespuestaJWT,
    @Args('dataInput', { type: () => MenuUpdateInput })
    dataInput: MenuUpdateInput,
  ) {
      const menu = await this.menuService.menuUpdate(dataInput,usuarioAuth);
      return plainToClass(MenuAdministracionType, menu);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => MenuDeleteType, { nullable: true })
  async menuDelete(
    @CurrentUser() usuarioAuth: RespuestaJWT,
    @Args('id', { nullable: true, type: () => Int }) id: number,
  ) {
      return await this.menuService.menuDelete(id,usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => MenuCollectionType, { nullable: true })
  public async menuCollection(
      @Info() info,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: MenuFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      const menuCollection = await this.menuService.menuCollection(pagination, where, order, fields);
      return menuCollection;
  }

  @UseGuards(AuthGuard)
  @Query(() => MenuAdministracionType, { nullable: false })
  public async menu(
    @Info() info,
    @Args('id', { nullable: true, type: () => Number }) id: number,
  ) {
    const fields = fieldsMap(info);
    const dataMenuById = await this.menuService.menu(id, fields);
    return dataMenuById;
  }
}