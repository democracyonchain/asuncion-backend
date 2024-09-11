import { relationsWhereInput, stateWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ActaDigitalizacionFilterInput')
export class ActaDigitalizacionFilterInput {

  @Field(() => stateWhereInput, { nullable: true })
  readonly bloqueo?: stateWhereInput;

  @Field(() => relationsWhereInput, { nullable: true })
  readonly usuarioescaneo?: relationsWhereInput;

  @Field(() => relationsWhereInput, { nullable: true })
  readonly usuariodigitacion?: relationsWhereInput;

  @Field(() => relationsWhereInput, { nullable: true })
  readonly usuariocontrol?: relationsWhereInput;
}