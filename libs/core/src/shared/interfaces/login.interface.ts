import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResult{
    username: string;
    token: string;
    provincia: string;
    establecimiento: any
  }

export interface Userdata<DataType>{
    user: DataType;
}