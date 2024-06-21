
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ProvinciaReportes')
export class ProvinciaReportesType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


@ObjectType()
export default class ProvinciaReportesCollectionType extends CollectionTypeGql<ProvinciaReportesType>(ProvinciaReportesType) { }