import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('PartidoDigitalizacion')
export class PartidoDigitalizacionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: true })
    readonly nombre: string;

}