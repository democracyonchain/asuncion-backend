import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('EstablecimientoCreateInput')
export class EstablecimientoCreateInput {
  @IsString()
  @Field({ nullable: false })
  nombre: string;

  @IsString()
  @Field({ nullable: false })
  logo: string;
}

@InputType('EstablecimientoUpdateInput')
export class EstablecimientoUpdateInput extends PartialType(EstablecimientoCreateInput) {

  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @Field({ nullable: true })
  estado: boolean;

}