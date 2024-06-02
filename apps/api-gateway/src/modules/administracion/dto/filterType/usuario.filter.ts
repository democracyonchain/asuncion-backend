import { stringWhereInput, numberWhereInput, stateWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('UsuarioFilterInput')
export class UsuarioFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombres?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly apellidos?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly username?: stringWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly provincia_id?: numberWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;
}
