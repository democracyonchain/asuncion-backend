import { Partido } from "./partido.dto";
import { Dignidad } from "./dignidad.dto";


/**
 * DTO para devolver información del candidato
 *
 * @export
 * @class Candidato
 * @typedef {Candidato}
 */
export class Candidato {
    id: number;
    cedula: string;
    nombre: string;
    partido: Partido;
    dignidad: Dignidad;
    orden: number;
}