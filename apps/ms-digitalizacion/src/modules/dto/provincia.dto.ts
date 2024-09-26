import { stringWhereInput } from "@bsc/core";

/**
 * DTO para filtrar la coleccioń de provincia
 *
 * @export
 * @class ProvinciaFilterInput
 * @typedef {ProvinciaFilterInput}
 */
export class ProvinciaFilterInput {
    readonly nombre?: stringWhereInput;
}


/**
 * DTO para devolver información de la provincia
 *
 * @export
 * @class Provincia
 * @typedef {Provincia}
 */
export class Provincia{
    id: number;
    nombre: string;
}