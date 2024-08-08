import { Partido } from "./partido.dto";
import { Dignidad } from "./dignidad.dto";


export class Candidato {
    id: number;
    cedula: string;
    nombre: string;
    partido: Partido;
    dignidad: Dignidad;
    orden: number;
}