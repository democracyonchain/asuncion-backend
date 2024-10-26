
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CantonDigitalizacionType } from './canton.object';

@ObjectType('ParroquiaDigitalizacion')
export class ParroquiaDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    readonly nombre: string;

    @Field(() => CantonDigitalizacionType, { nullable: true })
    readonly canton: CantonDigitalizacionType;
}


@ObjectType()
export default class ParroquiaDigitalizacionCollectionType extends CollectionTypeGql<ParroquiaDigitalizacionType>(ParroquiaDigitalizacionType) { }