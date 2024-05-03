import { numberWhereInput, stateWhereInput, stringWhereInput } from '@bsc/core';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Allow, IsNumber, IsOptional, IsString } from 'class-validator';
import { Modulo, ModuloFilterInput } from './modulo.dto';


export class MenuDTO {

    @Allow()
    id: number;

    @Allow()
    titulo: string;

    @Allow()
    icono: string;

    @Allow()
    modulo_id: number;

    @Allow()
    orden: number;
    
    
}

@InputType('MenuFilterInput')
export class MenuFilterInput {
  readonly titulo?: stringWhereInput;
  readonly modulo?: ModuloFilterInput;
  readonly estado?: stateWhereInput;
  readonly orden?: numberWhereInput;
}


export class Menu {
  id: number;
  titulo: string;
  icono: string;
  estado: boolean;
  modulo_id: number;
  modulo: Modulo;
  orden: number;
}