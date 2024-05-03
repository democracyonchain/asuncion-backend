import { stateWhereInput, stringWhereInput, relationsWhereInput, numberWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";
import { ModuloFilterInput } from './modulo.filter';

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