
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { PermisosType } from './permisos.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de rol
 *
 * @export
 * @class RolAdministracionType
 * @typedef {RolAdministracionType}
 */
@ObjectType('RolAdministracion')
export class RolAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: false })
    descripcion: string;

    @Field({ nullable: false })
    estado: boolean;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class RolCollectionType
 * @typedef {RolCollectionType}
 * @extends {CollectionTypeGql<RolAdministracionType>(RolAdministracionType)}
 */
@ObjectType()
export default class RolCollectionType extends CollectionTypeGql<RolAdministracionType>(RolAdministracionType) { }


/**
 * Extensión del DTO pricipal usado para devolver datos adicionales que no deben ir en la colección
 *
 * @export
 * @class RolType
 * @typedef {RolType}
 * @extends {PartialType(RolAdministracionType)}
 */
@ObjectType('Rol')
export class RolType extends PartialType(RolAdministracionType) {

  @Field(() => [PermisosType], { nullable: false })
  permisos: PermisosType; 
}