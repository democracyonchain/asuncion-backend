
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ProvinciaAdministracion')
export class ProvinciaAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


@ObjectType()
export default class ProvinciaCollectionType extends CollectionTypeGql<ProvinciaAdministracionType>(ProvinciaAdministracionType) { }