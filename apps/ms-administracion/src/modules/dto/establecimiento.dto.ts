import {  stateWhereInput, stringWhereInput } from '@bsc/core';

export class EstablecimientoDTO {
    id: number;
    nombre: string;
    logo: string; 
}

export class EstablecimientoFilterInput {
  readonly nombre?: stringWhereInput;
  readonly estado?: stateWhereInput;
}

export class Establecimiento {
    id: number;
    nombre: string;
    logo: Buffer;
  }