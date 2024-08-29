import { Field, InputType, Int } from "@nestjs/graphql";
import { VotosUpdateInput } from "./votos.input";
import { ImagenActaUpdateInput } from "./imagenacta.input";
import { ImagenSegmentoUpdateInput } from "./imagensegmento.input";
import { IsOptional } from "class-validator";

@InputType('ActaUpdateInput')
export class ActaUpdateInput  {

  @Field(() => Int)
  id: number;

  @IsOptional()
  @Field(() => Int,  { nullable: true })
  votosicr: number;

  @Field(() => Int)
  sufragantes: number;

  @Field(() => Int)
  blancos: number;

  @Field(() => Int)
  nulos: number;

  @Field(() => [VotosUpdateInput], { nullable: false })
  votos: VotosUpdateInput;

  @Field(() => ImagenActaUpdateInput, { nullable: false })
  imagenacta: ImagenActaUpdateInput;

  @Field(() => [ImagenSegmentoUpdateInput], { nullable: false })
  imagensegmento: ImagenSegmentoUpdateInput;

}