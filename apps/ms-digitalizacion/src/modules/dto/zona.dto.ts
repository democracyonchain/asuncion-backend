import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Parroquia } from "./parroquia.dto";

/**
 * DTO para filtrar la coleccioń de zona
 *
 * @export
 * @class ZonaFilterInput
 * @typedef {ZonaFilterInput}
 */
export class ZonaFilterInput {
    readonly nombre?: stringWhereInput;
    readonly parroquia_id?: numberWhereInput;
    readonly zona_id?: numberWhereInput;
}


/**
 * DTO para devolver información de zona
 *
 * @export
 * @class Zona
 * @typedef {Zona}
 */
export class Zona{
    nombre: string;
    parroquia: Parroquia;
    zona_id: number
}