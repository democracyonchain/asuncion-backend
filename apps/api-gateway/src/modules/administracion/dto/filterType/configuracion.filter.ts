import { stateWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtro para las colecciones de la tabla de configuración
 *
 * @export
 * @class ConfiguracionFilterInput
 * @typedef {ConfiguracionFilterInput}
 */
@InputType('ConfiguracionFilterInput')
export class ConfiguracionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly codigoproceso?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombreproceso?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}