
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ProvinciaDigitalizacion')
export class ProvinciaDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


@ObjectType()
export default class ProvinciaDigitalizacionCollectionType extends CollectionTypeGql<ProvinciaDigitalizacionType>(ProvinciaDigitalizacionType) { }