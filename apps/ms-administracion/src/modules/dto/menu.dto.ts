import { numberWhereInput, stateWhereInput, stringWhereInput } from '@bsc/core';
import { Modulo, ModuloFilterInput } from './modulo.dto';


/**
 * DTO para insertar o actualizar datos de menú
 *
 * @export
 * @class MenuDTO
 * @typedef {MenuDTO}
 */
export class MenuDTO {
    id: number;
    titulo: string;
    icono: string;
    modulo_id: number;
    orden: number; 
}

/**
 * DTO para filtrar la coleccioń de menu
 *
 * @export
 * @class MenuFilterInput
 * @typedef {MenuFilterInput}
 */
export class MenuFilterInput {
  readonly titulo?: stringWhereInput;
  readonly modulo?: ModuloFilterInput;
  readonly estado?: stateWhereInput;
  readonly orden?: numberWhereInput;
}


/**
 * DTO de respuesta para entity de menu
 *
 * @export
 * @class Menu
 * @typedef {Menu}
 */
export class Menu {
  id: number;
  titulo: string;
  icono: string;
  estado: boolean;
  modulo_id: number;
  modulo: Modulo;
  orden: number;
}