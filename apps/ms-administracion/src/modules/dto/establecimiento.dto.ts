import {  stateWhereInput, stringWhereInput } from '@bsc/core';

/**
 * DTO para insertar o actualizar datos de establecimiento
 *
 * @export
 * @class EstablecimientoDTO
 * @typedef {EstablecimientoDTO}
 */
export class EstablecimientoDTO {
    id: number;
    nombre: string;
    logo: string; 
}

/**
 * DTO para filtrar la coleccioń de establecimiento
 *
 * @export
 * @class EstablecimientoFilterInput
 * @typedef {EstablecimientoFilterInput}
 */
export class EstablecimientoFilterInput {
  readonly nombre?: stringWhereInput;
  readonly estado?: stateWhereInput;
}

/**
 * DTO de respuesta para entity de establecimiento
 *
 * @export
 * @class Establecimiento
 * @typedef {Establecimiento}
 */
export class Establecimiento {
    id: number;
    nombre: string;
    logo: Buffer;
  }