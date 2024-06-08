import { stateWhereInput, stringWhereInput } from '@bsc/core';

export class ModuloDTO {
    id: number;
    nombre: string;
    codigo: string;
    url: string;
    icono: string;
}


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