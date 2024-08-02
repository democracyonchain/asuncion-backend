
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProvinciaDigitalizacionType } from './provincia.object';

@ObjectType('CantonDigitalizacion')
export class CantonDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    readonly nombre: string;

    @Field(() => ProvinciaDigitalizacionType, { nullable: true })
    readonly provincia: ProvinciaDigitalizacionType;
}


@ObjectType()
export default class CantonDigitalizacionCollectionType extends CollectionTypeGql<CantonDigitalizacionType>(CantonDigitalizacionType) { }