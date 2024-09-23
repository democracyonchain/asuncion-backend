import { stateWhereInput, stringWhereInput } from '@bsc/core';

/**
 * DTO para insertar o actualizar datos de modulo
 *
 * @export
 * @class ModuloDTO
 * @typedef {ModuloDTO}
 */
export class ModuloDTO {
    id: number;
    nombre: string;
    codigo: string;
    url: string;
    icono: string;
}


/**
 * DTO para filtrar la coleccioń de modulo
 *
 * @export
 * @class ModuloFilterInput
 * @typedef {ModuloFilterInput}
 */
export class ModuloFilterInput {
  readonly nombres?: stringWhereInput;
  readonly codigo?: stringWhereInput;
  readonly estado?: stateWhereInput;
}


/**
 * DTO de respuesta para entity de modulo
 *
 * @export
 * @class Modulo
 * @typedef {Modulo}
 */
export class Modulo {
    id: number;
    nombre: string;
    codigo: string;
    url: string;
    icono: string;
    estado: boolean;
}