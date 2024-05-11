
import { CollectionTypeGql } from '@bsc/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';


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


@ObjectType()
export default class ModuloCollectionType extends CollectionTypeGql<ModuloAdministracionType>(ModuloAdministracionType) { }