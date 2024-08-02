import { Dignidad } from "./dignidad.dto";
import { Junta } from "./junta.dto";
import { Votos } from "./votos.dto";

export class Acta {
    id: number;
    dignidad_id: number;
    junta_id: number;
    seguridad: number;
    estado: number;
    usuarioescaneo: number;
    dignidad: Dignidad;
    junta: Junta;
    votos : [Votos]
}