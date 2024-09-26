import { Constructable, generateSHA256Hash, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { VotosEntity } from '../entities/votos.entity';

type EntityFields = keyof VotosEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de votos
 *
 * @export
 * @class VotosRepository
 * @typedef {VotosRepository}
 * @extends {RepositoryOrmBase<VotosEntity>}
 */
@Injectable()
export class VotosRepository extends RepositoryOrmBase<VotosEntity> {
  protected entity: Constructable<VotosEntity> = VotosEntity;

  /**
   * Función que actuliza los votos durante el proceso de escaneo
   *
   * @async
   * @param {number} acta_id
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateVotosEscaneo(acta_id:number, data:any, queryRunner:any) {
    await queryRunner.query(
      `CALL actualizar_votos_escaneo(${acta_id}, ${data.candidato_id},${data.votosicr});`
    ); 
  }

  /**
   * Función que actualiza los votos durante el proceso de digitalización
   *
   * @async
   * @param {number} acta_id
   * @param {number} candidato_id
   * @param {number} votosdigitacion
   * @param {number} usuarioId
   * @param {string} dataCifrado
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateVotosDigitalizacion(acta_id:number,candidato_id:number,votosdigitacion:number,usuarioId:number,dataCifrado:string,queryRunner:any) {
    await queryRunner.query(
      `CALL actualizar_votos_digitalizacion(${acta_id},${candidato_id},${votosdigitacion},
      '${dataCifrado}','${generateSHA256Hash(dataCifrado)}',${usuarioId});`
    ); 
  }
}

