import { Field, ObjectType } from '@nestjs/graphql';
import { ModuloAuthType } from './modulo.object';
import { PermisosForModuloAuthType } from './permisos.object';


@ObjectType('MenuAuth')
export class MenuAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    titulo: string;

    @Field(() => ModuloAuthType, { nullable: true })
    modulo: ModuloAuthType;
}


@ObjectType('MenuforModuloAuth')
export class MenuforModuloAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    titulo: string;

    @Field(() => [PermisosForModuloAuthType], { nullable: true })
    permisos: PermisosForModuloAuthType;
}