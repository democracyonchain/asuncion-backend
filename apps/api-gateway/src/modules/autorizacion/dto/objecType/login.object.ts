
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType('Login')
export class LoginType {

    @Field({ nullable: false })
    token: string;

    @Field({ nullable: false })
    username: string;
}