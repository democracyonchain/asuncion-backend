import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Provincia } from "./provincia.dto";

/**
 * DTO para filtrar la coleccioń de canton
 *
 * @export
 * @class CantonFilterInput
 * @typedef {CantonFilterInput}
 */
export class CantonFilterInput {
    readonly nombre?: stringWhereInput;
    readonly provincia_id?: numberWhereInput;
}


/**
 * DTO para devolver información del canton
 *
 * @export
 * @class Canton
 * @typedef {Canton}
 */
export class Canton{
    id: number;
    nombre: string;
    provincia: Provincia;
}