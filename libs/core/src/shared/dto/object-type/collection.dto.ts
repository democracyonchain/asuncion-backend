import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfoType } from './pageInfo.dto';
import { Constructable } from '../../interfaces/constructable';
import { Allow } from 'class-validator';
import { Type } from '@nestjs/common';


export  function CollectionTypeGql<T>(type: Type<T>): any {

  @ObjectType()
 class CollectionTypeGql<T>{
  
    @Field(() => [type], { nullable: true })
    data: T;
  
    @Field(() => PageInfoType, { nullable: true })
    pageInfo: PageInfoType;
  }


  return CollectionTypeGql<T>
}



@ObjectType()
export class CollectionType<Entity>{
    data: [Entity];
    pageInfo: PageInfoType;
  }



