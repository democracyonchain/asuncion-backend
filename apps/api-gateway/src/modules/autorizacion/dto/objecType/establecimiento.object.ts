import { Base64Scalar } from '@bsc/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('EstablecimientoAuth')
export class EstablecimientoAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: true })
    logo: Base64Scalar;
}