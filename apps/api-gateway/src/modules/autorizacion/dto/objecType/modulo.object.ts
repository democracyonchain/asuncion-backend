
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {  MenuforModuloAuthType } from './menu.object';


@ObjectType('ModuloAuth')
export class ModuloAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    nombre: string;

    @Field({ nullable: false })
    codigo: string;

    @Field({ nullable: false })
    url: string;

    @Field({ nullable: false })
    icono: string;

    @Field({ nullable: false })
    estado: boolean;

    @Field(() => [MenuforModuloAuthType], { nullable: true })
    menu: MenuforModuloAuthType;
}