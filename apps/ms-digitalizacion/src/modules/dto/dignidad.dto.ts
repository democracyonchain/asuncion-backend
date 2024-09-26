import { numberWhereInput, stringWhereInput } from "@bsc/core";

/**
 * DTO para devolver información de dignidad
 *
 * @export
 * @class Dignidad
 * @typedef {Dignidad}
 */
export class Dignidad {
    id: number;
    nombre: string;
}


/**
 * DTO para filtrar la coleccioń de dignidad
 *
 * @export
 * @class DignidadFilterInput
 * @typedef {DignidadFilterInput}
 */
export class DignidadFilterInput {
  readonly nombre?: stringWhereInput;
  readonly estado?: numberWhereInput;
  readonly ambito?: stringWhereInput;
}