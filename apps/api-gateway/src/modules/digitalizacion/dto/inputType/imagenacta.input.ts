import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType('ImagenActaUpdateInput')
export class ImagenActaUpdateInput  {

  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  pagina: string;

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