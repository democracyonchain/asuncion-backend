import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MutatioResult{
    status: boolean;
    message?: string;
    code?:number
  }

@ObjectType()
export class MutatioResultTransacccion{
    status: boolean;
    message?: string;
    code?:string;
  }