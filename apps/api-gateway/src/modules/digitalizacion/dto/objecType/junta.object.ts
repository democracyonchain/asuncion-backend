
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProvinciaDigitalizacionType } from './provincia.object';
import { CantonDigitalizacionType } from './canton.object';
import { ParroquiaDigitalizacionType } from './parroquia.object';

@ObjectType('JuntaDigitalizacion')
export class JuntaDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    readonly junta: number;

    @Field({ nullable: false })
    readonly sexo: string;

    @Field({ nullable: false })
    readonly electores: number;

    @Field(() => ProvinciaDigitalizacionType, { nullable: true })
    readonly provincia: ProvinciaDigitalizacionType;

    @Field(() => CantonDigitalizacionType, { nullable: true })
    readonly canton: CantonDigitalizacionType;

    @Field(() => ParroquiaDigitalizacionType, { nullable: true })
    readonly parroquia: ParroquiaDigitalizacionType;

    @Field({ nullable: true })
    readonly zona_id: number;
}


@ObjectType()
export default class JuntaDigitalizacionCollectionType extends CollectionTypeGql<JuntaDigitalizacionType>(JuntaDigitalizacionType) { }