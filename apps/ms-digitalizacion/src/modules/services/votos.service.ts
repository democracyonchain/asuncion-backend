import { Injectable } from '@nestjs/common';
import { GlobalResult, PayloadData } from '@bsc/core';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { VotosManager } from '../manager/votos.manager';
import { VotosDigitalizacionDTO } from '../dto/votos.dto';

@Injectable()
export class VotosService {

    constructor(
        private readonly listaNegraTokenManager: ListaNegraTokenManager,
        private readonly votosManager: VotosManager,
    ) {}
 
    async updateVotosDigitalizacion(params:  PayloadData<VotosDigitalizacionDTO>): Promise<GlobalResult> {
        let status: boolean = false;
        let message: string = `Error al momento de actualizar los votos`;
        await this.listaNegraTokenManager.validarToken(params.dataUser.token);
        await this.votosManager.updateVotosDigitalizacion(params);
        status = true;
        message = "Datos de votos actualizados correctamente";
        return { status, message };
      }
}