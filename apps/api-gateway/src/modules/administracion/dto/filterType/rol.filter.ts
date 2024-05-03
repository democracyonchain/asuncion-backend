import { stateWhereInput, stringWhereInput, relationsWhereInput, numberWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";
import { ModuloFilterInput } from './modulo.filter';

@InputType('RolFilterInput')
export class RolFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}