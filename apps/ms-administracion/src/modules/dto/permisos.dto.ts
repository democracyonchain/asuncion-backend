import {  InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';

@InputType('PermisosDTO')
export class PermisosDTO {

    @Allow()
    menu_id: number;

    @Allow()
    crear: boolean;

    @Allow()
    editar: boolean;

    @Allow()
    leer: boolean;

    @Allow()
    eliminar: boolean;

    @Allow()
    imprimir: boolean;

}