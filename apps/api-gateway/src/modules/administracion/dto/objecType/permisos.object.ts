
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MenuAdministracionType } from './menu.object';


@ObjectType('Permisos')
export class PermisosType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    menu_id: number;

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

    @Field({ nullable: false })
    estado: boolean;

    @Field(() => MenuAdministracionType, { nullable: false })
    menu: MenuAdministracionType; 
}