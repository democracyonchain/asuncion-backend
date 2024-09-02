import { Candidato } from "./candidato";

export class Votos {
    votos: number;
    votosicr: number;
    votosdigitacion: number;
    votoscontrol: number;
    candidato: Candidato;
}

export class VotosDTO {
    candidato_id: number;
    votosicr: number;
}

export class VotosDigitalizacionDTO  {
    acta_id: number;
    votos : [VotosDigitalizacionBasicDTO]
}
export class VotosDigitalizacionBasicDTO  {
    candidato_id: number;
    votosdigitacion: number;
    cifrado: string;
    hash: string;
}