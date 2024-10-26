import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GlobalResult, PayloadData } from '@bsc/core';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { VotosManager } from '../manager/votos.manager';
import { VotosDigitalizacionDTO } from '../dto/votos.dto';
import { RpcException } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { EncryptionService } from './encriptado.service';
import { ActaManager } from '../manager/acta.manager';
import { EncryptionCtsService } from './encriptado-cts.service';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de votos
 *
 * @export
 * @class VotosService
 * @typedef {VotosService}
 */
@Injectable()
export class VotosService {

    constructor(
        private readonly listaNegraTokenManager: ListaNegraTokenManager,
        private readonly votosManager: VotosManager,
        private readonly actaManager: ActaManager,
        private readonly datasource: DataSource,
        private readonly encryptionCtsService: EncryptionCtsService,
        
    ) {}
 
    /**
     * Función para actualizar los votos en el proceso de digitalización
     *
     * @async
     * @param {PayloadData<VotosDigitalizacionDTO>} params
     * @returns {Promise<GlobalResult>}
     */
    async updateVotosDigitalizacion(params:  PayloadData<VotosDigitalizacionDTO>): Promise<GlobalResult> {
        let status: boolean = false;
        let message: string = `Error al momento de actualizar los votos`;
        await this.listaNegraTokenManager.validarToken(params.dataUser.token);
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.votosManager.updateVotosDigitalizacion(params,queryRunner,this.encryptionCtsService);
            await this.actaManager.updateLiberaActa(params.data.acta_id,queryRunner);
            await queryRunner.commitTransaction(); 
            status = true;
            message = "Datos de votos actualizados correctamente";
        }catch (error) {
            Logger.error(error);
            await queryRunner.rollbackTransaction(); 
            throw new RpcException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message, 
            });
        }
        finally {
        await queryRunner.release();
        }
        return { status, message };
      }
}