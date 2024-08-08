import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Parroquia } from "./parroquia.dto";

export class ZonaFilterInput {
    readonly nombre?: stringWhereInput;
    readonly parroquia_id?: numberWhereInput;
    readonly zona_id?: numberWhereInput;
}


export class Zona{
    nombre: string;
    parroquia: Parroquia;
    zona_id: number
}