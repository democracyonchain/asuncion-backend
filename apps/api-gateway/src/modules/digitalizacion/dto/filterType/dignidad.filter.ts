import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('DignidadDigitalizacionFilterInput')
export class DignidadDigitalizacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly estado?: numberWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly ambito?: stringWhereInput;
}