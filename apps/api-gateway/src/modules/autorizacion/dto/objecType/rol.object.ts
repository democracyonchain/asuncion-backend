import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de rol para autorización
 *
 * @export
 * @class RolAuthType
 * @typedef {RolAuthType}
 */
@ObjectType('RolAuth')
export class RolAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: false })
    descripcion: string;
}