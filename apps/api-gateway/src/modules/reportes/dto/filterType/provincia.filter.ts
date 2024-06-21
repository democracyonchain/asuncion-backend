import { stringWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";

@InputType('ProvinciaReportesFilterInput')
export class ProvinciaReportesFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;
}