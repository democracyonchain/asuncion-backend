import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO con los campos que se solicitan para la creación de modulos
 *
 * @export
 * @class ModuloCreateInput
 * @typedef {ModuloCreateInput}
 */
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

/**
 * DTO con los campos que se solicitan para la actualización de modulos
 *
 * @export
 * @class ModuloUpdateInput
 * @typedef {ModuloUpdateInput}
 * @extends {PartialType(ModuloCreateInput)}
 */
@InputType('ModuloUpdateInput')
export class ModuloUpdateInput extends PartialType(ModuloCreateInput) {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}