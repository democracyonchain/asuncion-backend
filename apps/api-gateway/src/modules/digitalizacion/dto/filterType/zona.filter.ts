import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ZonaDigitalizacionFilterInput')
export class ZonaDigitalizacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly parroquia_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly codigo?: numberWhereInput;
}