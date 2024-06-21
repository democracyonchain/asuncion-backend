import { stringWhereInput } from "@bsc/core";

export class ProvinciaFilterInput {
    readonly nombre?: stringWhereInput;
}


export class Provincia{
    id: number;
    nombre: string;
}