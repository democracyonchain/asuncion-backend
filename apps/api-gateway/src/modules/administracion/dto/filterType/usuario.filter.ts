import { stateWhereInput, stringWhereInput, relationsWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('UsuarioFilterInput')
export class UsuarioFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombres?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly apellidos?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly username?: stringWhereInput;

}
