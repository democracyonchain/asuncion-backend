import { CollectionTypeGql, DateScalar } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export default class ConfiguracionCollectionType extends CollectionTypeGql<ConfiguracionAdminitracionType>(ConfiguracionAdminitracionType) { }