import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('DignidadDigitalizacion')
export class DignidadDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: true })
    readonly nombre: string;

}