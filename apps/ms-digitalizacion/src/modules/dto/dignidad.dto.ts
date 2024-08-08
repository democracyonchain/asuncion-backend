import { numberWhereInput, stringWhereInput } from "@bsc/core";

export class Dignidad {
    id: number;
    nombre: string;
}


export class DignidadFilterInput {
  readonly nombre?: stringWhereInput;
  readonly estado?: numberWhereInput;
  readonly ambito?: stringWhereInput;
}