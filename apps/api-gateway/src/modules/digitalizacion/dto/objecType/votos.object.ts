import { Field, ObjectType } from "@nestjs/graphql";
import { CandidatoDigitalizacionType } from "./candidato.object";

@ObjectType('VotosDigitalizacion')
export class VotosDigitalizacionType {

    @Field({ nullable: false })
    readonly votos: number;

    @Field({ nullable: false })
    readonly votosicr: number;

    @Field({ nullable: false })
    readonly votosdigitacion: number;

    @Field({ nullable: false })
    readonly votoscontrol: number;

    @Field(() => CandidatoDigitalizacionType, { nullable: true })
    readonly candidato: CandidatoDigitalizacionType;
}