import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('ImagenSegmentoDigitalizacionAleatorio')
export class ImagenSegmentoDigitalizacionAleatorioType {
    @Field({ nullable: false })
    readonly junta_id: number;

    @Field({ nullable: false })
    readonly dignidad_id: number;

    @Field({ nullable: false })
    readonly candidato_id: number;

    @Field({ nullable: false })
    readonly nombre: string;

    @Field({ nullable: true })
    imagen: string;
}