
import { CollectionTypeGql } from '@bsc/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModuloAdministracionType } from './modulo.object';


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


@ObjectType()
export default class MenuCollectionType extends CollectionTypeGql<MenuAdministracionType>(MenuAdministracionType) { }
