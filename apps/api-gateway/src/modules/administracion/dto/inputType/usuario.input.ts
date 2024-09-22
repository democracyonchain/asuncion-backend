import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, IsArray, IsInt } from 'class-validator';

/**
 * DTO con los campos que se solicitan para la creación de usuarios
 *
 * @export
 * @class UsuarioCreateInput
 * @typedef {UsuarioCreateInput}
 */
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

  @IsInt()
  @Field({ nullable: false })
  establecimiento_id: number;

}

/**
 * DTO con los campos que se solicitan para la actualización de usuarios
 *
 * @export
 * @class UsuarioUpdateInput
 * @typedef {UsuarioUpdateInput}
 * @extends {PartialType(UsuarioCreateInput)}
 */
@InputType('UsuarioUpdateInput')
export class UsuarioUpdateInput extends PartialType(UsuarioCreateInput){

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}