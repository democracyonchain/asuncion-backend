import { Field, InputType } from '@nestjs/graphql';

@InputType('StringOrderInput', {
  description:
    'Si existen relaciones, especificar el nombre de la entidad y el campo separado por un punto. Ejemplo:{order:{asc:"paciente.id"}}',
})

export class StringOrderInput {
  @Field(()=>String,{ nullable: true })
  asc?: string;

  @Field(()=>String,{ nullable: true })
  desc?: string;
}
