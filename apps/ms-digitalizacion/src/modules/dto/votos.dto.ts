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