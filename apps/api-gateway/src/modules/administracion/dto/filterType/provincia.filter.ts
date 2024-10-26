import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtros para las colecciones de la tabla de provincia
 *
 * @export
 * @class ProvinciaFilterInput
 * @typedef {ProvinciaFilterInput}
 */
@InputType('ProvinciaFilterInput')
export class ProvinciaFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}