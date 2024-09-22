
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de provincia
 *
 * @export
 * @class ProvinciaDigitalizacionType
 * @typedef {ProvinciaDigitalizacionType}
 */
@ObjectType('ProvinciaDigitalizacion')
export class ProvinciaDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    readonly nombre: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class ProvinciaDigitalizacionCollectionType
 * @typedef {ProvinciaDigitalizacionCollectionType}
 * @extends {CollectionTypeGql<ProvinciaDigitalizacionType>(ProvinciaDigitalizacionType)}
 */
@ObjectType()
export default class ProvinciaDigitalizacionCollectionType extends CollectionTypeGql<ProvinciaDigitalizacionType>(ProvinciaDigitalizacionType) { }