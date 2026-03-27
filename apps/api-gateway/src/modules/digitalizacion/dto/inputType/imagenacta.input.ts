import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType('ImagenActaUpdateInput')
export class ImagenActaUpdateInput  {

  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsOptional() 
  @Field(() => Int,  { nullable: true })
  pagina: number;

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