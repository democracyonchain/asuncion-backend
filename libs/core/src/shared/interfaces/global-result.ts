import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GlobalResult{
    status: boolean;
    message?: string;
    code?:string
  }