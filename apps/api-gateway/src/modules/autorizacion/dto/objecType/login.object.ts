
import { Field, ObjectType } from '@nestjs/graphql';
import { EstablecimientoAuthType } from './establecimiento.object';


@ObjectType('Login')
export class LoginType {

    @Field({ nullable: false })
    token: string;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    provincia: string;

    @Field(() => EstablecimientoAuthType, { nullable: true })
    establecimiento: EstablecimientoAuthType;

    @Field({ nullable: false })
    provincia_id: number;
}