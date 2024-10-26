import { stateWhereInput, stringWhereInput, numberWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";
import { ModuloFilterInput } from './modulo.filter';

/**
 * Filtros para las colecciones de la tabla de menu
 *
 * @export
 * @class MenuFilterInput
 * @typedef {MenuFilterInput}
 */
@InputType('MenuFilterInput')
export class MenuFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly titulo?: stringWhereInput;

  @Field(() => ModuloFilterInput, { nullable: true })
  readonly modulo?: ModuloFilterInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly orden?: numberWhereInput;

}