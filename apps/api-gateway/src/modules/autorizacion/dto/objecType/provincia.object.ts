import { Field, ObjectType } from "@nestjs/graphql";

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de provincia para autorización
 *
 * @export
 * @class ProvinciaAuthType
 * @typedef {ProvinciaAuthType}
 */
@ObjectType('ProvinciaAuth')
export class ProvinciaAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}