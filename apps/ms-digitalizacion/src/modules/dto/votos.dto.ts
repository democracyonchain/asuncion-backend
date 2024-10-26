import { Candidato } from "./candidato";

/**
 * DTO para devolver información de votos
 *
 * @export
 * @class Votos
 * @typedef {Votos}
 */
export class Votos {
    votos: number;
    votosicr: number;
    votosdigitacion: number;
    votoscontrol: number;
    candidato: Candidato;
}

/**
 * DTO para insertar datos de votos
 *
 * @export
 * @class VotosDTO
 * @typedef {VotosDTO}
 */
export class VotosDTO {
    candidato_id: number;
    votosicr: number;
}

/**
 * DTO para cuando se hace la actualización de cantidad de votos
 *
 * @export
 * @class VotosDigitalizacionDTO
 * @typedef {VotosDigitalizacionDTO}
 */
export class VotosDigitalizacionDTO  {
    acta_id: number;
    votos : [VotosDigitalizacionBasicDTO]
}
/**
 * DTO con los campso basicos para la actualización de votos
 *
 * @export
 * @class VotosDigitalizacionBasicDTO
 * @typedef {VotosDigitalizacionBasicDTO}
 */
export class VotosDigitalizacionBasicDTO  {
    candidato_id: number;
    votosdigitacion: number;
    cifrado: string;
    hash: string;
}