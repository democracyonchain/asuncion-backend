import { CollectionTypeGql } from "@bsc/core";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('DignidadDigitalizacion')
export class DignidadDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: true })
    readonly nombre: string;

    @Field({ nullable: true })
    readonly ambito: string;

    @Field({ nullable: true })
    readonly estado: number;

    @Field({ nullable: true })
    readonly orden: number;
}

@ObjectType()
export default class DignidadDigitalizacionCollectionType extends CollectionTypeGql<DignidadDigitalizacionType>(DignidadDigitalizacionType) { }