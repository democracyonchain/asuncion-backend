import { stateWhereInput, stringWhereInput, relationsWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ModuloFilterInput')
export class ModuloFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombres?: stringWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly codigo?: stringWhereInput;

  @Field(() => stateWhereInput, { nullable: true })
  readonly estado?: stateWhereInput;

}