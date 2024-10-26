
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { ModuloAdministracionType } from './modulo.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de menú
 *
 * @export
 * @class MenuAdministracionType
 * @typedef {MenuAdministracionType}
 */
@ObjectType('MenuAdministracion')
export class MenuAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    titulo: string;

    @Field({ nullable: false })
    icono: string;

    @Field({ nullable: false })
    estado: boolean;

    @Field({ nullable: false })
    modulo_id: number;

    @Field(() => ModuloAdministracionType, { nullable: true })
    modulo: ModuloAdministracionType;

    @Field({ nullable: true })
    orden: number;

    @Field({ nullable: false })
    url: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class MenuCollectionType
 * @typedef {MenuCollectionType}
 * @extends {CollectionTypeGql<MenuAdministracionType>(MenuAdministracionType)}
 */
@ObjectType()
export default class MenuCollectionType extends CollectionTypeGql<MenuAdministracionType>(MenuAdministracionType) { }
