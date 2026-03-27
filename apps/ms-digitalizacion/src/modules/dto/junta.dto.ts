  /*aquiiiiiiiiiiiii */
  import { numberWhereInput, stringWhereInput } from '@bsc/core';
  import { Provincia } from './provincia.dto';
  import { Canton } from './canton.dto';
  import { Parroquia } from './parroquia.dto';
  import { Zona } from './zona.dto';

  /**
   * DTO para filtrar la coleccioń de junta
   *
   * @export
   * @class JuntaFilterInput
   * @typedef {JuntaFilterInput}
   */
  /*export class JuntaFilterInput {
    readonly provincia_id?: numberWhereInput;
    readonly canton_id?: numberWhereInput;
    readonly parroquia_id?: numberWhereInput;
    readonly zona_id?: numberWhereInput;
    readonly sexo?: stringWhereInput;
  }*/


  /**
   * DTO para devolver información de la junta
   *
   * @export
   * @class Junta
   * @typedef {Junta}
   */
  /*export class Junta{

      id: number;
      junta: number;
      sexo: string;
      electores: number;
      provincia: Provincia;
      canton: Canton;
      parroquia: Parroquia;
      zona: Zona;
  }
  */
 import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';

@InputType()
export class JuntaFilterInput {
  @Field(() => numberWhereInput, { nullable: true })
  readonly provincia_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly canton_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly parroquia_id?: numberWhereInput;

  @Field(() => numberWhereInput, { nullable: true })
  readonly zona_id?: numberWhereInput;

  @Field(() => stringWhereInput, { nullable: true })
  readonly sexo?: stringWhereInput;
}

@ObjectType()
export class Junta {

  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  junta?: number;

  @Field(() => String, { nullable: true })
  sexo?: string;

  @Field(() => Int, { nullable: true })
  electores?: number;

  @Field(() => Provincia, { nullable: true })
  provincia?: Provincia;

  @Field(() => Canton, { nullable: true })
  canton?: Canton;

  @Field(() => Parroquia, { nullable: true })
  parroquia?: Parroquia;

  // ✅ AHORA SÍ APARECE EN GRAPHQL
  @Field(() => Zona, { nullable: true })
  zona?: Zona;
}
