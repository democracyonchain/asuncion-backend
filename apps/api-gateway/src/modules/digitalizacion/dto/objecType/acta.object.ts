import { Field, ObjectType } from "@nestjs/graphql";
import { DignidadDigitalizacionType } from "./dignidad.object";
import { JuntaDigitalizacionType } from "./junta.object";
import { VotosDigitalizacionAleatorioType, VotosDigitalizacionType } from "./votos.object";
import { DateScalar } from "@bsc/core";

@ObjectType('ActaDigitalizacion')
export class ActaDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: true })
    readonly dignidad_id: number;

    @Field({ nullable: true })
    readonly junta_id: number;

    @Field({ nullable: true })
    readonly seguridad: number;

    @Field({ nullable: true })
    readonly estado: number;

    @Field({ nullable: true })
    readonly usuarioescaneo: number;

    @Field({ nullable: true })
    readonly fechaescaneo: DateScalar;

    @Field({ nullable: true })
    readonly usuariodigitacion: number;

    @Field({ nullable: true })
    readonly fechadigitacion: DateScalar;

    @Field({ nullable: true })
    readonly usuariocontrol: number;

    @Field({ nullable: true })
    readonly fechacontrol: DateScalar;

    @Field({ nullable: true })
    readonly peticion: number;

    @Field({ nullable: true })
    readonly sufragantesicr: number;

    @Field({ nullable: true })
    readonly sufragantesdigitacion: number;

    @Field({ nullable: true })
    readonly sufragantescontrol: number;

    @Field({ nullable: true })
    readonly sufragantes: number;

    @Field({ nullable: true })
    readonly blancosicr: number;

    @Field({ nullable: true })
    readonly blancosdigitacion: number;

    @Field({ nullable: true })
    readonly blancoscontrol: number;

    @Field({ nullable: true })
    readonly blancos: number;

    @Field({ nullable: true })
    readonly nulosicr: number;

    @Field({ nullable: true })
    readonly nulosdigitacion: number;

    @Field({ nullable: true })
    readonly nulos: number;

    @Field(() => DignidadDigitalizacionType, { nullable: true })
    readonly dignidad: DignidadDigitalizacionType;

    @Field(() => JuntaDigitalizacionType, { nullable: true })
    readonly junta: JuntaDigitalizacionType;
}

@ObjectType('ActaDigitalizacionAleatorio')
export class ActaDigitalizacionAleatorioType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: true })
    readonly dignidad_id: number;

    @Field({ nullable: true })
    readonly junta_id: number;

    @Field({ nullable: true })
    readonly seguridad: number;

    @Field({ nullable: true })
    readonly estado: number;

    @Field({ nullable: true })
    readonly peticion: number;

    @Field({ nullable: true })
    readonly sufragantesdigitacion: number;

    @Field({ nullable: true })
    readonly blancosdigitacion: number;

    @Field({ nullable: true })
    readonly nulosdigitacion: number;

    @Field(() => DignidadDigitalizacionType, { nullable: true })
    readonly dignidad: DignidadDigitalizacionType;

    @Field(() => JuntaDigitalizacionType, { nullable: true })
    readonly junta: JuntaDigitalizacionType;
}

@ObjectType('ActaDigitalizacionVoto') 
export class ActaDigitalizacionVotoType extends ActaDigitalizacionAleatorioType {

    @Field(() => [VotosDigitalizacionType], { nullable: false })
    readonly votos: VotosDigitalizacionType;   
}

@ObjectType('ActaDigitalizacionVotoImagen') 
export class ActaDigitalizacionVotoImagenType extends ActaDigitalizacionAleatorioType {

    @Field(() => [VotosDigitalizacionAleatorioType], { nullable: false })
    readonly votos: VotosDigitalizacionAleatorioType;   
}