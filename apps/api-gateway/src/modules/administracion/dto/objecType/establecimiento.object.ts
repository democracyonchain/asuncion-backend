import { Base64Scalar, CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de establecimiento
 *
 * @export
 * @class EstablecimientoAdminitracionType
 * @typedef {EstablecimientoAdminitracionType}
 */
@ObjectType('EstablecimientoAdminitracion')
export class EstablecimientoAdminitracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: true })
    logo: Base64Scalar;
}

/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class EstablecimientoCollectionType
 * @typedef {EstablecimientoCollectionType}
 * @extends {CollectionTypeGql<EstablecimientoAdminitracionType>(EstablecimientoAdminitracionType)}
 */
@ObjectType()
export default class EstablecimientoCollectionType extends CollectionTypeGql<EstablecimientoAdminitracionType>(EstablecimientoAdminitracionType) { }
