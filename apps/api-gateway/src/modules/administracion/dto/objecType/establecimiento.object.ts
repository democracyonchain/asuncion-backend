import { Base64Scalar, CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('EstablecimientoAdminitracion')
export class EstablecimientoAdminitracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: true })
    logo: Base64Scalar;
}

@ObjectType()
export default class EstablecimientoCollectionType extends CollectionTypeGql<EstablecimientoAdminitracionType>(EstablecimientoAdminitracionType) { }
