
import { CollectionTypeGql } from '@bsc/core';
import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { PermisosType } from './permisos.object';


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


@ObjectType()
export default class RolCollectionType extends CollectionTypeGql<RolAdministracionType>(RolAdministracionType) { }


@ObjectType('Rol')
export class RolType extends PartialType(RolAdministracionType) {

  @Field(() => [PermisosType], { nullable: false })
  permisos: PermisosType; 
}