import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('PageInfo')
export class PageInfoType {

  @Field(() => Int, { nullable: true })
  count: number;

  @Field(() => Int, { nullable: true })
  limit: number;

  @Field(() => Int, { nullable: true })
  offset: number;

  @Field(() => Boolean,{ nullable: true })
  hasPreviousPage:boolean
  
  @Field(() => Boolean,{ nullable: true })
  hasNextPage:boolean

}