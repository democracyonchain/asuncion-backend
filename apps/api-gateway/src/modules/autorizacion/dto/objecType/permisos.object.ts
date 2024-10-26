import { Field, ObjectType } from '@nestjs/graphql';
import { MenuAuthType } from './menu.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de permisos para autorización
 *
 * @export
 * @class PermisosAuthType
 * @typedef {PermisosAuthType}
 */
@ObjectType('PermisosAuth')
export class PermisosAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    crear: boolean;

    @Field({ nullable: false })
    editar: boolean;

    @Field({ nullable: false })
    leer: boolean;
    
    @Field({ nullable: false })
    eliminar: boolean;

    @Field({ nullable: false })
    imprimir: boolean;

    @Field(() => MenuAuthType, { nullable: true })
    menu: MenuAuthType;
}

@ObjectType('PermisosForModuloAuth')
export class PermisosForModuloAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    crear: boolean;

    @Field({ nullable: false })
    editar: boolean;

    @Field({ nullable: false })
    leer: boolean;
    
    @Field({ nullable: false })
    eliminar: boolean;

    @Field({ nullable: false })
    imprimir: boolean;
}