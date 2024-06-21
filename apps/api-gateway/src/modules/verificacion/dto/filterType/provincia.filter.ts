import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ProvinciaVerificacionFilterInput')
export class ProvinciaVerificacionFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}