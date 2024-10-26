
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de módulo
 *
 * @export
 * @class ModuloAdministracionType
 * @typedef {ModuloAdministracionType}
 */
@ObjectType('ModuloAdministracion')
export class ModuloAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: false })
    codigo: string;

    @Field({ nullable: false })
    url: string;

    @Field({ nullable: false })
    icono: string;

    @Field({ nullable: false })
    estado: boolean;

    @Field({ nullable: false })
    color: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class ModuloCollectionType
 * @typedef {ModuloCollectionType}
 * @extends {CollectionTypeGql<ModuloAdministracionType>(ModuloAdministracionType)}
 */
@ObjectType()
export default class ModuloCollectionType extends CollectionTypeGql<ModuloAdministracionType>(ModuloAdministracionType) { }