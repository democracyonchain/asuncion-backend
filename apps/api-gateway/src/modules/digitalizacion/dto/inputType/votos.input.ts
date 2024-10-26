import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType('VotosUpdateInput')
export class VotosUpdateInput  {

  @Field(() => Int)
  candidato_id: number;

  @Field(() => Int)
  votosicr: number;

}
@InputType('VotosDigitacionUpdateBasicInput')
export class VotosDigitacionUpdateBasicInput  {

  @Field(() => Int,  { nullable: false })
  candidato_id: number;

  @Field(() => Int,  { nullable: false })
  votosdigitacion: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  cifrado: string;
}
@InputType('VotosDigitacionUpdateInput')
export class VotoDigitacionsUpdateInput  {

  @Field(() => Int,  { nullable: false })
  acta_id: number;

  @Field(() => [VotosDigitacionUpdateBasicInput], { nullable: false })
  votos: VotosDigitacionUpdateBasicInput;
}




