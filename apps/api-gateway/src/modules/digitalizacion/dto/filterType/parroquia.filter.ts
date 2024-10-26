import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ParroquiaDigitalizacionFilterInput')
export class ParroquiaDigitalizacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly canton_id?: numberWhereInput;
}