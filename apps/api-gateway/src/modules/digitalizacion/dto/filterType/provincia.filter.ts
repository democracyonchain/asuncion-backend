import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtros para las colecciones de la tabla de provincia
 *
 * @export
 * @class ProvinciaDigitalizacionFilterInput
 * @typedef {ProvinciaDigitalizacionFilterInput}
 */
@InputType('ProvinciaDigitalizacionFilterInput')
export class ProvinciaDigitalizacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}