import { numberWhereInput, stateWhereInput, stringWhereInput } from '@bsc/core';
import { Modulo, ModuloFilterInput } from './modulo.dto';


export class MenuDTO {
    id: number;
    titulo: string;
    icono: string;
    modulo_id: number;
    orden: number; 
}

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