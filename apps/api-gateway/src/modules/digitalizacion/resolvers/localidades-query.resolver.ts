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
import { ProvinciaDigitalizacionFilterInput } from '../dto/filterType/provincia.filter';
import ProvinciaDigitalizacionCollectionType, { ProvinciaDigitalizacionType } from '../dto/objecType/provincia.object';
import { LocalidadesService } from '../services/localidades.service';
import CantonDigitalizacionCollectionType from '../dto/objecType/canton.object';
import { CantonDigitalizacionFilterInput } from '../dto/filterType/canton.filter';
import ParroquiaDigitalizacionCollectionType from '../dto/objecType/parroquia.object';
import { ParroquiaDigitalizacionFilterInput } from '../dto/filterType/parroquia.filter';
import ZonaDigitalizacionCollectionType from '../dto/objecType/zona.object';
import { ZonaDigitalizacionFilterInput } from '../dto/filterType/zona.filter';
import JuntaDigitalizacionCollectionType from '../dto/objecType/junta.object';
import { JuntaDigitalizacionFilterInput } from '../dto/filterType/junta.filter';
  
  
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()

export class LocalidadesQueryResolver {
  
  constructor(private readonly localidadesService: LocalidadesService) { }

  @UseGuards(AuthGuard)
  @Query(() => ProvinciaDigitalizacionCollectionType, { nullable: true })
  public async digtProvinciaCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ProvinciaDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.localidadesService.provinciaCollection(pagination, where, order, fields, usuarioAuth);
  }


  @UseGuards(AuthGuard)
  @Query(() => ProvinciaDigitalizacionType, { nullable: false })
  public async digtProvincia(
    @Info() info,
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('id', { nullable: false, type: () => Int }) id: number,
  ) {
    const fields = fieldsMap(info);
    return await this.localidadesService.provincia(id, fields, usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => CantonDigitalizacionCollectionType, { nullable: true })
  public async digtCantonCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: CantonDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.localidadesService.cantonCollection(pagination, where, order, fields, usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => ParroquiaDigitalizacionCollectionType, { nullable: true })
  public async digtParroquiaCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ParroquiaDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.localidadesService.parroquiaCollection(pagination, where, order, fields, usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => ZonaDigitalizacionCollectionType, { nullable: true })
  public async digtZonaCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: ZonaDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.localidadesService.zonaCollection(pagination, where, order, fields, usuarioAuth);
  }

  @UseGuards(AuthGuard)
  @Query(() => JuntaDigitalizacionCollectionType, { nullable: true })
  public async digtJuntaCollection(
      @Info() info,
      @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
      @Args('pagination', { nullable: true }) pagination: ConnectionInput,
      @Args('where', { nullable: true }) where?: JuntaDigitalizacionFilterInput,
      @Args('order', { nullable: true }) order?: StringOrderInput,
  ) {
      const fields = fieldsMap(info);
      return await this.localidadesService.juntaCollection(pagination, where, order, fields, usuarioAuth);
  }
}