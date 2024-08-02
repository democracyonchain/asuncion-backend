import { stateWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ConfiguracionFilterInput')
export class ConfiguracionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly codigoproceso?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombreproceso?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}