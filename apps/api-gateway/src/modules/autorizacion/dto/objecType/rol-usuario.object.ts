
import { Field, ObjectType } from '@nestjs/graphql';
import { RolAuthType } from './rol.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de rol-usuario para autorización
 *
 * @export
 * @class RolUsuarioAuthType
 * @typedef {RolUsuarioAuthType}
 */
@ObjectType('RolUsuarioAuth')
export class RolUsuarioAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field(() => RolAuthType, { nullable: true })
    rol: RolAuthType;
}