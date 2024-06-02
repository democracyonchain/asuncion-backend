import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, IsArray, IsInt } from 'class-validator';

@InputType('UsuarioCreateInput')
export class UsuarioCreateInput {

  @IsString()
  @Field({ nullable: false })
  username: string;

  @IsString()
  @Field({ nullable: false })
  nombres: string;

  @IsString()
  @Field({ nullable: false })
  apellidos: string;

  @IsString()
  @Field({ nullable: false })
  email: string;

  @IsString()
  @Field({ nullable: false })
  password: string;

  @IsArray()
  @Field(() => [Int], { nullable: false })
  roles: [number];

  @IsInt()
  @Field({ nullable: false })
  provincia_id: number;

}

@InputType('UsuarioUpdateInput')
export class UsuarioUpdateInput extends PartialType(UsuarioCreateInput){

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}