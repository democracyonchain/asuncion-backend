import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtros para las colecciones de la tabla de provincia
 *
 * @export
 * @class ProvinciaVerificacionFilterInput
 * @typedef {ProvinciaVerificacionFilterInput}
 */
@InputType('ProvinciaVerificacionFilterInput')
export class ProvinciaVerificacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}