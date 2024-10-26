
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de provincia
 *
 * @export
 * @class ProvinciaAdministracionType
 * @typedef {ProvinciaAdministracionType}
 */
@ObjectType('ProvinciaAdministracion')
export class ProvinciaAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class ProvinciaCollectionType
 * @typedef {ProvinciaCollectionType}
 * @extends {CollectionTypeGql<ProvinciaAdministracionType>(ProvinciaAdministracionType)}
 */
@ObjectType()
export default class ProvinciaCollectionType extends CollectionTypeGql<ProvinciaAdministracionType>(ProvinciaAdministracionType) { }