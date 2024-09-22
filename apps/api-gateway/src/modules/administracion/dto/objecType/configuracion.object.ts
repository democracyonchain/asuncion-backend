import { CollectionTypeGql, DateScalar } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de configuración
 *
 * @export
 * @class ConfiguracionAdminitracionType
 * @typedef {ConfiguracionAdminitracionType}
 */
@ObjectType('ConfiguracionAdminitracion')
export class ConfiguracionAdminitracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    codigoproceso: string;

    @Field({ nullable: false })
    nombreproceso: string;

    @Field({ nullable: false })
    fechaproceso: DateScalar;

    @Field({ nullable: false })
    estado: boolean;
}

/**
 * Extensión del DTO pricipal usado para devolver los datos de las colecciones
 *
 * @export
 * @class ConfiguracionCollectionType
 * @typedef {ConfiguracionCollectionType}
 * @extends {CollectionTypeGql<ConfiguracionAdminitracionType>(ConfiguracionAdminitracionType)}
 */
@ObjectType()
export default class ConfiguracionCollectionType extends CollectionTypeGql<ConfiguracionAdminitracionType>(ConfiguracionAdminitracionType) { }