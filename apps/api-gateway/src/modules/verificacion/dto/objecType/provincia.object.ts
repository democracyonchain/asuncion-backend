
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ProvinciaVerificacion')
export class ProvinciaVerificacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


@ObjectType()
export default class ProvinciaVerificacionCollectionType extends CollectionTypeGql<ProvinciaVerificacionType>(ProvinciaVerificacionType) { }