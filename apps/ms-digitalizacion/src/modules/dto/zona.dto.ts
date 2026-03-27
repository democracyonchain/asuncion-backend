import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Parroquia } from './parroquia.dto';

/**
 * DTO para filtrar la colección de zona
 */
@InputType()
export class ZonaFilterInput {

  @Field(() => stringWhereInput, { nullable: true })
  readonly nombre?: stringWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly parroquia_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly zona_id?: numberWhereInput;
}

/**
 * DTO para devolver información de zona
 */
@ObjectType()
export class Zona {

  @Field(() => Int)
  zona_id: number;

  @Field(() => String)
  nombre: string;

  @Field(() => Int)
  parroquia_id: number;

  @Field(() => Parroquia, { nullable: true })
  parroquia?: Parroquia;
}
