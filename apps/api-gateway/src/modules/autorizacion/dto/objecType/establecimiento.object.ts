import { Base64Scalar } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de establecimiento
 *
 * @export
 * @class EstablecimientoAuthType
 * @typedef {EstablecimientoAuthType}
 */
@ObjectType('EstablecimientoAuth')
export class EstablecimientoAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: true })
    logo: Base64Scalar;
}