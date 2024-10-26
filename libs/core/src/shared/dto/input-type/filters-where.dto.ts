import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('StringWhereInput', {
  description: 'Filtros para cuando los datos son de tipo string',
})
export class stringWhereInput {
  @Field(()=>String,{ nullable: true })
  is?: string;

  @Field(()=>String,{ nullable: true })
  not?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];

  @Field(() => [String], { nullable: true })
  not_in?: string[];

  @Field(()=>String,{ nullable: true })
  contains?: string;

  @Field(()=>String,{ nullable: true })
  not_contains?: string;

  @Field(()=>String,{ nullable: true })
  starts_with?: string;

  @Field(()=>String,{ nullable: true })
  ends_with?: string;
}





@InputType('dateWhereInput', {
  description: 'Filtros para cuando los filtros son de tipo date',
})
export class dateWhereInput {
  @Field(()=>String,{ nullable: true })
  is_date?: string;

  @Field(()=>String,{ nullable: true })
  lt_date?: string;

  @Field(()=>String,{ nullable: true })
  lte_date?: string;

  @Field(()=>String,{ nullable: true })
  gt_date?: string;

  @Field(()=>String,{ nullable: true })
  gte_date?: string;

  @Field(() => [String], { nullable: true })
  between?: string[];

}


@InputType('NumberWhereInput', {
  description: 'Filtros para cuando los filtros son de tipo numero',
})

export class numberWhereInput {
  @Field(()=>Int,{ nullable: true })
  is?: number;

  @Field(()=>Int,{ nullable: true })
  not?: number;

  @Field(()=>Boolean,{ nullable: true })
  is_null? : boolean ;

  @Field(() => [Int], { nullable: true })
  in?: number[];

  @Field(() => [Int], { nullable: true })
  not_in?: number[];

  @Field(()=>Int,{ nullable: true })
  lt?: number;

  @Field(()=>Int,{ nullable: true })
  lte?: number;

  @Field(()=>Int,{ nullable: true })
  gt?: number;

  @Field(()=>Int,{ nullable: true })
  gte?: number;
}

@InputType('StateWhereInput', {
  description: 'Filtros para tipo estado',
})

export class stateWhereInput {
  @Field(()=>Boolean,{ nullable: true })
  is?: boolean;

  @Field(()=>Boolean,{ nullable: true })
  not?: boolean;
}

@InputType('RelationsWhereInput', {
  description: 'Filtros para cuando se usan relaciones ',
})
export class relationsWhereInput {
  @Field(()=>Int,{ nullable: true })
  is?: number;

  @Field(()=>Int,{ nullable: true })
  not?: number;

  @Field(() => [Int], { nullable: true })
  in?: number[];

  @Field(() => [Int], { nullable: true })
  not_in?: number[];
}