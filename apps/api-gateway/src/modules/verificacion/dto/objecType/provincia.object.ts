
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de provincia
 *
 * @export
 * @class ProvinciaVerificacionType
 * @typedef {ProvinciaVerificacionType}
 */
@ObjectType('ProvinciaVerificacion')
export class ProvinciaVerificacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class ProvinciaVerificacionCollectionType
 * @typedef {ProvinciaVerificacionCollectionType}
 * @extends {CollectionTypeGql<ProvinciaVerificacionType>(ProvinciaVerificacionType)}
 */
@ObjectType()
export default class ProvinciaVerificacionCollectionType extends CollectionTypeGql<ProvinciaVerificacionType>(ProvinciaVerificacionType) { }