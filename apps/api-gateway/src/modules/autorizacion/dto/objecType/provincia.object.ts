import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('ProvinciaAuth')
export class ProvinciaAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;
}