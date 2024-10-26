import { stateWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

/**
 * Filtros para las colecciones de la tabla de modulo
 *
 * @export
 * @class ModuloFilterInput
 * @typedef {ModuloFilterInput}
 */
@InputType('ModuloFilterInput')
export class ModuloFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombres?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly codigo?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}