import { Field, InputType, Int } from '@nestjs/graphql';
import {  IsOptional, IsString } from 'class-validator';
import { PermisosCrearInput, PermisosUpdateInput } from './permisos.input';

/**
 * DTO con los campos que se solicitan para la creación de roles
 *
 * @export
 * @class RolCreateInput
 * @typedef {RolCreateInput}
 */
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

/**
 * DTO con los campos que se solicitan para la actualización de roles
 *
 * @export
 * @class RolUpdateInput
 * @typedef {RolUpdateInput}
 */
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