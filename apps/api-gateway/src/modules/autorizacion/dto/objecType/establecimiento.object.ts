import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('EstablecimientoAuth')
export class EstablecimientoAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: true })
    logo: string;
}