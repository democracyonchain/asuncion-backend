import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Parroquia } from "./parroquia.dto";

export class ZonaFilterInput {
    readonly nombre?: stringWhereInput;
    readonly parroquia_id?: numberWhereInput;
    readonly codigo?: numberWhereInput;
}


export class Zona{
    id: number;
    nombre: string;
    parroquia: Parroquia;
    codigo: number
}