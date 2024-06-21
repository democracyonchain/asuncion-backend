import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ProvinciaDigitalizacionFilterInput')
export class ProvinciaDigitalizacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}