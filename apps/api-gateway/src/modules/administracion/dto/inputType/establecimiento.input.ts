import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO con los campos que se solicitan para la creación de establecimientos
 *
 * @export
 * @class EstablecimientoCreateInput
 * @typedef {EstablecimientoCreateInput}
 */
@InputType('EstablecimientoCreateInput')
export class EstablecimientoCreateInput {
  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsString()
  @Field({ nullable: false })
  logo: string;
}

/**
 * DTO con los campos que se solicitan para la actualización de establecimientos
 *
 * @export
 * @class EstablecimientoUpdateInput
 * @typedef {EstablecimientoUpdateInput}
 * @extends {PartialType(EstablecimientoCreateInput)}
 */
@InputType('EstablecimientoUpdateInput')
export class EstablecimientoUpdateInput extends PartialType(EstablecimientoCreateInput) {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}