
import { Field, ObjectType } from '@nestjs/graphql';
import {  MenuforModuloAuthType } from './menu.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de modulo para autorización
 *
 * @export
 * @class ModuloAuthType
 * @typedef {ModuloAuthType}
 */
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

    @Field(() => [MenuforModuloAuthType], { nullable: true })
    menu: MenuforModuloAuthType;

    @Field({ nullable: false })
    color: string;
}