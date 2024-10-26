import { stateWhereInput, stringWhereInput } from "@bsc/core";

/**
 * DTO para filtrar la coleccioń de configuración
 *
 * @export
 * @class ConfiguracionFilterInput
 * @typedef {ConfiguracionFilterInput}
 */
export class ConfiguracionFilterInput {
  readonly codigoproceso?: stringWhereInput;
  readonly nombreproceso?: stringWhereInput;
  readonly estado?: stateWhereInput;
}



/**
 * DTO de respuesta para entity de configuración
 *
 * @export
 * @class Configuracion
 * @typedef {Configuracion}
 */
export class Configuracion {
    readonly id: number;
    codigoproceso: string;
    nombreproceso: string;
    fechaproceso: Date;
    estado: boolean;
}