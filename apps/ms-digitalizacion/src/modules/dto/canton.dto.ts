import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Provincia } from "./provincia.dto";

export class CantonFilterInput {
    readonly nombre?: stringWhereInput;
    readonly provincia_id?: numberWhereInput;
}


export class Canton{
    id: number;
    nombre: string;
    provincia: Provincia;
}