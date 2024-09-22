import { stateWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtros para las colecciones de la tabla de establecimiento
 *
 * @export
 * @class EstablecimientoFilterInput
 * @typedef {EstablecimientoFilterInput}
 */
@InputType('EstablecimientoFilterInput')
export class EstablecimientoFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}