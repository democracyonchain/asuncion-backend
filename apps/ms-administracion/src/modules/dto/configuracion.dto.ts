import { stateWhereInput, stringWhereInput } from "@bsc/core";

export class ConfiguracionFilterInput {
  readonly codigoproceso?: stringWhereInput;
  readonly nombreproceso?: stringWhereInput;
  readonly estado?: stateWhereInput;
}



export class Configuracion {

    readonly id: number;
    codigoproceso: string;
    nombreproceso: string;
    fechaproceso: Date;
    estado: boolean;
}