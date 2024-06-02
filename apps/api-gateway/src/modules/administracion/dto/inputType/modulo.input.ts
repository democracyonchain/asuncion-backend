import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('ModuloCreateInput')
export class ModuloCreateInput {

  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsString()
  @Field({ nullable: false })
  codigo: string;

  @IsString()
  @Field({ nullable: false })
  url: string;

  @IsString()
  @Field({ nullable: true })
  icono: string;

  @IsString()
  @Field({ nullable: false })
  color: string;

}

@InputType('ModuloUpdateInput')
export class ModuloUpdateInput extends PartialType(ModuloCreateInput) {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}