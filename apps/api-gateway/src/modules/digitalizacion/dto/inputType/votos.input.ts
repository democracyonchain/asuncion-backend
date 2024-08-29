import { Field, InputType, Int } from "@nestjs/graphql";

@InputType('VotosUpdateInput')
export class VotosUpdateInput  {

  @Field(() => Int)
  candidato_id: number;

  @Field(() => Int)
  votosicr: number;

}