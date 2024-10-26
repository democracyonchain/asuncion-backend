import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('GlobalResultType')
export class GlobalResultType {
  @Field(() => Boolean,{ nullable: false })
  public status: boolean;

  @Field(() => String,{ nullable: false })
  public message?: string;
}