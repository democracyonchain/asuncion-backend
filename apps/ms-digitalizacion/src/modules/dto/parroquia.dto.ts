import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Canton } from "./canton.dto";

/**
 * DTO para filtrar la coleccioń de parroquia
 *
 * @export
 * @class ParroquiaFilterInput
 * @typedef {ParroquiaFilterInput}
 */
export class ParroquiaFilterInput {
    readonly nombre?: stringWhereInput;
    readonly canton_id?: numberWhereInput;
}


/**
 * DTO para devolver información de parroquia
 *
 * @export
 * @class Parroquia
 * @typedef {Parroquia}
 */
export class Parroquia{
    id: number;
    nombre: string;
    canton: Canton;
}