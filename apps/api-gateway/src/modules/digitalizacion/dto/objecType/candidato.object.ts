import { Field, ObjectType } from "@nestjs/graphql";
import { PartidoDigitalizacionType } from "./partido.object";
import { DignidadDigitalizacionType } from "./dignidad.object";

@ObjectType('CandidatoDigitalizacion')
export class CandidatoDigitalizacionType {


    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: true })
    readonly cedula: string;

    @Field({ nullable: false })
    readonly nombre: string;

    @Field(() => PartidoDigitalizacionType, { nullable: true })
    readonly partido: PartidoDigitalizacionType;

    @Field(() => DignidadDigitalizacionType, { nullable: true })
    readonly dignidad: DignidadDigitalizacionType;

    @Field({ nullable: true })
    readonly orden: number;

}