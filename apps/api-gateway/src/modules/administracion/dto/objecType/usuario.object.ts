
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProvinciaAdministracionType } from './provincia.object';
import { RolUsuarioAdministracionType } from './rol-usuario.object';
import { EstablecimientoAdminitracionType } from './establecimiento.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de usuario
 *
 * @export
 * @class UsuarioBasicAdministracionType
 * @typedef {UsuarioBasicAdministracionType}
 */
@ObjectType('UsuarioBasicAdministracion')
export class UsuarioBasicAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    nombres: string;

    @Field({ nullable: false })
    apellidos: string;

    @Field({ nullable: false })
    provincia_id: number;

    @Field({ nullable: false })
    estado: boolean;

    @Field(() => ProvinciaAdministracionType, { nullable: false })
    provincia: ProvinciaAdministracionType; 

    @Field({ nullable: false })
    establecimiento_id: number;

    @Field(() => EstablecimientoAdminitracionType, { nullable: false })
    establecimiento: EstablecimientoAdminitracionType; 

    @Field({ nullable: false })
    email: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class UsuarioCollectionType
 * @typedef {UsuarioCollectionType}
 * @extends {CollectionTypeGql<UsuarioBasicAdministracionType>(UsuarioBasicAdministracionType)}
 */
@ObjectType()
export default class UsuarioCollectionType extends CollectionTypeGql<UsuarioBasicAdministracionType>(UsuarioBasicAdministracionType) { }


/**
 * Extensión del DTO pricipal usado para devolver datos adicionales que no deben ir en la colección
 *
 * @export
 * @class UsuarioAdministracionType
 * @typedef {UsuarioAdministracionType}
 * @extends {UsuarioBasicAdministracionType}
 */
@ObjectType('UsuarioAdministracion')
export class UsuarioAdministracionType extends UsuarioBasicAdministracionType{

    @Field(() => [RolUsuarioAdministracionType], { nullable: true })
    rolusuario: RolUsuarioAdministracionType;
}