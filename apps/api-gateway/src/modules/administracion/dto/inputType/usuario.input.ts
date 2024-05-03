import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

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

}

@InputType('UsuarioUpdateInput')
export class UsuarioUpdateInput {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  nombres: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  apellidos: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  email: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  password: string;

  @IsOptional()
  @Field({ nullable: true })
  estado: number;

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
  roles: [number];

}