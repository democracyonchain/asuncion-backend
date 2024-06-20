
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProvinciaAdministracionType } from './provincia.object';
import { RolUsuarioAdministracionType } from './rol-usuario.object';
import { EstablecimientoAdminitracionType } from './establecimiento.object';


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


@ObjectType()
export default class UsuarioCollectionType extends CollectionTypeGql<UsuarioBasicAdministracionType>(UsuarioBasicAdministracionType) { }


@ObjectType('UsuarioAdministracion')
export class UsuarioAdministracionType extends UsuarioBasicAdministracionType{

    @Field(() => [RolUsuarioAdministracionType], { nullable: true })
    rolusuario: RolUsuarioAdministracionType;
}