import { Field, InputType, Int } from '@nestjs/graphql';
@InputType('PaginationInput', {
  description: 'Ingresar por lo menos un campo, limit o offset',
})
export class ConnectionInput {

  @Field(()=>Int,{ nullable: true, description: 'Paginate limit' })
  public limit?: number;

  @Field(()=>Int,{ nullable: true, description: 'Paginate offset' })
  public offset?: number;
}
