import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt } from 'class-validator';

@InputType('PermisosCrearInput')
export class PermisosCrearInput {

    @IsInt()
    @Field({ nullable: false })
    menu_id: number;

    @IsBoolean()
    @Field({ nullable: false })
    crear: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    editar: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    leer: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    eliminar: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    imprimir: boolean;

}

@InputType('PermisosUpdateInput')
export class PermisosUpdateInput {

    @IsInt()
    @Field({ nullable: true })
    id: number;

    @IsInt()
    @Field({ nullable: false })
    menu_id: number;

    @IsBoolean()
    @Field({ nullable: false })
    crear: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    editar: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    leer: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    eliminar: boolean;

    @IsBoolean()
    @Field({ nullable: false })
    imprimir: boolean;

}