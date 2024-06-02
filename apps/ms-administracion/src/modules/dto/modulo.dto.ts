import { stateWhereInput, stringWhereInput } from '@bsc/core';
import { InputType} from '@nestjs/graphql';
import { Allow } from 'class-validator';


export class ModuloDTO {

    @Allow()
    id: number;

    @Allow()
    nombre: string;

    @Allow()
    codigo: string;

    @Allow()
    url: string;
    
    @Allow()
    icono: string;
}

@InputType('ModuloFilterInput')
export class ModuloFilterInput {
  readonly nombres?: stringWhereInput;
  readonly codigo?: stringWhereInput;
  readonly estado?: stateWhereInput;
}


export class Modulo {
    id: number;
    nombre: string;
    codigo: string;
    url: string;
    icono: string;
    estado: boolean;
}