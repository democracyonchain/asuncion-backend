import { Dignidad } from "./dignidad.dto";
import { ImagenActaDTO } from "./imagen-acta";
import { ImagenSegmentoDTO } from "./imagen-segmento";
import { Junta } from "./junta.dto";
import { Votos, VotosDTO } from "./votos.dto";

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

export class ActaDTO {
    id: number;
    votosicr: number;
    sufragantes: number;
    blancos: number;
    nulos: number;
    votos: [VotosDTO];
    imagenacta: ImagenActaDTO;
    imagensegmento: [ImagenSegmentoDTO];
}