import { Field, InputType, Int } from "@nestjs/graphql";

@InputType('ActaEstadoUpdateInput')
export class ActaEstadoUpdateInput  {

  @Field(() => Int)
  id: number; 

  @Field(() => String)
  txicr: string;

   @Field(() => Int)
  fase: number; 

}