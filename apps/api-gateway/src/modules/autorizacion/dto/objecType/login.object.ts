
import { Field, ObjectType } from '@nestjs/graphql';
import { EstablecimientoAuthType } from './establecimiento.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios para logeo
 *
 * @export
 * @class LoginType
 * @typedef {LoginType}
 */
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