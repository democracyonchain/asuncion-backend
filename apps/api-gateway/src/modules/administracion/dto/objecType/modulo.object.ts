
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
}


@ObjectType()
export default class ModuloCollectionType extends CollectionTypeGql<ModuloAdministracionType>(ModuloAdministracionType) { }


@ObjectType('ModuloDelete')
export class ModuloDeleteType {
  @Field({ nullable: true })
  status: boolean;
  @Field({ nullable: true })
  message: string;
}