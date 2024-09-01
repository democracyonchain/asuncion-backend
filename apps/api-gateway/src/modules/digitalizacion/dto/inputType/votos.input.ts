import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType('VotosUpdateInput')
export class VotosUpdateInput  {

  @Field(() => Int)
  candidato_id: number;

  @Field(() => Int)
  votosicr: number;

}

@InputType('VotosDigitacionUpdateInput')
export class VotoDigitacionsUpdateInput  {

  @Field(() => Int,  { nullable: false })
  acta_id: number;

  @Field(() => Int,  { nullable: false })
  candidato_id: number;

  @Field(() => Int,  { nullable: false })
  votosdigitacion: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  cifrado: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  hash: string;

}