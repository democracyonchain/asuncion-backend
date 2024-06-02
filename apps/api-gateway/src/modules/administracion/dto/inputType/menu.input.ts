import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('MenuCreateInput')
export class MenuCreateInput {

  @IsString()
  @Field({ nullable: false })
  titulo: string;

  @IsString()
  @Field({ nullable: false })
  icono: string;

  @IsInt()
  @Field({ nullable: false })
  modulo_id: number;

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  orden: number;

  @IsString()
  @Field({ nullable: false })
  url: string;
}

@InputType('MenuUpdateInput')
export class MenuUpdateInput extends PartialType(MenuCreateInput) {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}