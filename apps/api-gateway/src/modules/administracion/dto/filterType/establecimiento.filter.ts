import { stateWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('EstablecimientoFilterInput')
export class EstablecimientoFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}