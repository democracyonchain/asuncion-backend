
import { CollectionTypeGql } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de provincia
 *
 * @export
 * @class ProvinciaReportesType
 * @typedef {ProvinciaReportesType}
 */
@ObjectType('ProvinciaReportes')
export class ProvinciaReportesType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}


/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class ProvinciaReportesCollectionType
 * @typedef {ProvinciaReportesCollectionType}
 * @extends {CollectionTypeGql<ProvinciaReportesType>(ProvinciaReportesType)}
 */
@ObjectType()
export default class ProvinciaReportesCollectionType extends CollectionTypeGql<ProvinciaReportesType>(ProvinciaReportesType) { }