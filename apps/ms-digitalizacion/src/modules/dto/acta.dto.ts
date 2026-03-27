import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Dignidad } from './dignidad.dto';
import { Junta } from './junta.dto';
import { Votos } from './votos.dto';

@ObjectType()
export class Acta {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  auxiliar: number;

  @Field(() => Int, { nullable: true })
  dignidad_id?: number;

  @Field(() => Int, { nullable: true })
  junta_id?: number;

  @Field(() => Int, { nullable: true })
  seguridad?: number;

  @Field(() => Int, { nullable: true })
  estado?: number;

  @Field(() => Int, { nullable: true })
  peticion?: number;

  @Field(() => Int, { nullable: true })
  sufragantesdigitacion?: number;

  @Field(() => Int, { nullable: true })
  blancosdigitacion?: number;

  @Field(() => Int, { nullable: true })
  nulosdigitacion?: number;

  @Field(() => Dignidad, { nullable: true })
  dignidad?: Dignidad;

  @Field(() => Junta, { nullable: true })
  junta?: Junta;

  @Field(() => [Votos], { nullable: true })
  votos?: Votos[];
}
