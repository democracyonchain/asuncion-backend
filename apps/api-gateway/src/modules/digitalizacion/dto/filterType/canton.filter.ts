import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('CantonDigitalizacionFilterInput')
export class CantonDigitalizacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly provincia_id?: numberWhereInput;
}