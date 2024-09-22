import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtros para las colecciones de la tabla de provincia
 *
 * @export
 * @class ProvinciaFilterInput
 * @typedef {ProvinciaFilterInput}
 */
@InputType('ProvinciaReportesFilterInput')
export class ProvinciaReportesFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}