import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('RolAuth')
export class RolAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: false })
    descripcion: string;
}