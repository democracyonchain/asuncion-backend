import { Field, InputType, Int } from '@nestjs/graphql';
import {  IsOptional, IsString } from 'class-validator';
import { PermisosCrearInput, PermisosUpdateInput } from './permisos.input';

@InputType('RolCreateInput')
export class RolCreateInput {

  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsString()
  @Field({ nullable: false })
  descripcion: string;

  @Field(() => [PermisosCrearInput], { nullable: false })
  permisos: PermisosCrearInput;
}

@InputType('RolUpdateInput')
export class RolUpdateInput{

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  nombre: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  descripcion: string;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

  @Field(() => [PermisosUpdateInput], { nullable: true })
  permisos: PermisosUpdateInput;

}