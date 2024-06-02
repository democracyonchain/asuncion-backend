import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResult{
    username: string;
    token: string;
    provincia: string;
  }

export interface Userdata<DataType>{
    user: DataType;
}