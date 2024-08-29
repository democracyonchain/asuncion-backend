import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType('ImagenSegmentoUpdateInput')
export class ImagenSegmentoUpdateInput  {

  @Field(() => Int)
  candidato_id: number;

  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  hash: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  pathipfs: string;

  @IsString()
  @Field({ nullable: false })
  imagen: string;

}