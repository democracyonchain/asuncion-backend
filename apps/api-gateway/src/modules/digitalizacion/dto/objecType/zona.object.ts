
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { ParroquiaDigitalizacionType } from './parroquia.object';

@ObjectType('ZonaDigitalizacion')
export class ZonaDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    readonly nombre: string;

    @Field({ nullable: false })
    readonly codigo: number;

    @Field(() => ParroquiaDigitalizacionType, { nullable: true })
    readonly parroquia: ParroquiaDigitalizacionType;
}


@ObjectType()
export default class ZonaDigitalizacionCollectionType extends CollectionTypeGql<ZonaDigitalizacionType>(ZonaDigitalizacionType) { }