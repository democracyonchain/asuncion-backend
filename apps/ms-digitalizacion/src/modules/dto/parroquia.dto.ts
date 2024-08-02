import { numberWhereInput, stringWhereInput } from "@bsc/core";
import { Canton } from "./canton.dto";

export class ParroquiaFilterInput {
    readonly nombre?: stringWhereInput;
    readonly canton_id?: numberWhereInput;
}


export class Parroquia{
    id: number;
    nombre: string;
    canton: Canton;
}