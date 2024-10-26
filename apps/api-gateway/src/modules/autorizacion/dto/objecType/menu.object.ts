import { Field, ObjectType } from '@nestjs/graphql';
import { ModuloAuthType } from './modulo.object';
import { PermisosForModuloAuthType } from './permisos.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de menu
 *
 * @export
 * @class MenuAuthType
 * @typedef {MenuAuthType}
 */
@ObjectType('MenuAuth')
export class MenuAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    titulo: string;

    @Field(() => ModuloAuthType, { nullable: true })
    modulo: ModuloAuthType;
}


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de menú para autorización
 *
 * @export
 * @class MenuforModuloAuthType
 * @typedef {MenuforModuloAuthType}
 */
@ObjectType('MenuforModuloAuth')
export class MenuforModuloAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    titulo: string;

    @Field({ nullable: false })
    icono: string;

    @Field({ nullable: false })
    url: string;

    @Field(() => [PermisosForModuloAuthType], { nullable: true })
    permisos: PermisosForModuloAuthType;
}