import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

/**
 * DTO con los campos que se solicitan para la creación de menus
 *
 * @export
 * @class MenuCreateInput
 * @typedef {MenuCreateInput}
 */
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

/**
 * DTO con los campos que se solicitan para la actualización de menus
 *
 * @export
 * @class MenuUpdateInput
 * @typedef {MenuUpdateInput}
 * @extends {PartialType(MenuCreateInput)}
 */
@InputType('MenuUpdateInput')
export class MenuUpdateInput extends PartialType(MenuCreateInput) {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}