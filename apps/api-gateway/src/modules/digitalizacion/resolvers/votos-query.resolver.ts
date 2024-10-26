import {
    AllHttpExceptionGwFilter,
    AuthGuard,
    LogGwInterceptor,
    CurrentUserWithToken,
    RespuestaJWTToken,
    GlobalResultType
  } from '@bsc/core';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args,Mutation, Resolver } from '@nestjs/graphql';
import { VotosService } from '../services/votos.service';
import { VotoDigitacionsUpdateInput } from '../dto/inputType/votos.input';
  
  
/**
 * lase para publicación de todos los servicios de votos
 *
 * @export
 * @class VotosQueryResolver
 * @typedef {VotosQueryResolver}
 */
@UseFilters(AllHttpExceptionGwFilter)
@UseInterceptors(LogGwInterceptor)
@Resolver()
export class VotosQueryResolver {
  
  constructor(private readonly votosService: VotosService) { }
  

  /**
   * Servicio para actualización de votos
   *
   * @async
   * @param {RespuestaJWTToken} usuarioAuth
   * @param {VotoDigitacionsUpdateInput} dataInput
   * @returns {unknown}
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalResultType, { nullable: false })
  async digtVotosUpdate(
    @CurrentUserWithToken() usuarioAuth: RespuestaJWTToken,
    @Args('dataInput', { type: () => VotoDigitacionsUpdateInput })
    dataInput: VotoDigitacionsUpdateInput,
  ) {
      return await this.votosService.votosDigitalizacionUpdate(dataInput,usuarioAuth);
  }
}