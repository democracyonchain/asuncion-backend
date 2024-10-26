import { relationsWhereInput, stateWhereInput } from "@bsc/core";
import { Dignidad } from "./dignidad.dto";
import { ImagenActaDTO } from "./imagen-acta";
import { ImagenSegmentoDTO } from "./imagen-segmento";
import { Junta } from "./junta.dto";
import { Votos, VotosDTO } from "./votos.dto";

/**
 * DTO para devolver información del acta
 *
 * @export
 * @class Acta
 * @typedef {Acta}
 */
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

/**
 * DTO para ingreso de información del acta
 *
 * @export
 * @class ActaDTO
 * @typedef {ActaDTO}
 */
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

/**
 * DTO para filtrar la coleccioń de acta
 *
 * @export
 * @class ActaDigitalizacionFilterInput
 * @typedef {ActaDigitalizacionFilterInput}
 */
export class ActaDigitalizacionFilterInput {
  readonly bloqueo?: stateWhereInput;
  readonly usuarioescaneo?: relationsWhereInput;
  readonly usuariodigitacion?: relationsWhereInput;
  readonly usuariocontrol?: relationsWhereInput;
}

export class ActaBasic {
    id: number;
    dignidad_id: number;
    junta_id: number;
    dignidad: Dignidad;
    junta: Junta;
}