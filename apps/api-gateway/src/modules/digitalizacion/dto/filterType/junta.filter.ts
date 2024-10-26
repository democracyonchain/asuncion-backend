import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('JuntaDigitalizacionFilterInput')
export class JuntaDigitalizacionFilterInput {

  @Field(() => numberWhereInput, { nullable: true })
  readonly provincia_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly canton_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly parroquia_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly zona_id?: numberWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly sexo?: stringWhereInput;
}