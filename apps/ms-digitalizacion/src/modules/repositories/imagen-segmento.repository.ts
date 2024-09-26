import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ImagenSegmentoEntity } from '../entities/imagen-segmento.entity';

type EntityFields = keyof ImagenSegmentoEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de imagensegmento
 *
 * @export
 * @class ImagenSegmentoRepository
 * @typedef {ImagenSegmentoRepository}
 * @extends {RepositoryOrmBase<ImagenSegmentoEntity>}
 */
@Injectable()
export class ImagenSegmentoRepository extends RepositoryOrmBase<ImagenSegmentoEntity> {
  protected entity: Constructable<ImagenSegmentoEntity> = ImagenSegmentoEntity;

  /**
   * Función que permite actualizar los datos de imagensegmento
   *
   * @async
   * @param {number} junta_id
   * @param {number} dignidad_id
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateImagenSegmento(junta_id:number, dignidad_id:number, data:any, queryRunner:any) {
    await queryRunner.query(
      `CALL actualizar_acta_segmento(${junta_id}, ${dignidad_id},${data.candidato_id},'${data.imagen}', '${data.nombre}', '${data.pathipfs}');`
    ); 
  }

  /**
   * Función que obtiene las imagenessegmente en base a la dignidad y junta
   *
   * @async
   * @param {number} dignidad_id
   * @param {number} junta_id
   * @returns {unknown}
   */
  async getImagenSegmento(dignidad_id:number, junta_id:number) {
    return await  this.getRepository().query(
      `SELECT * FROM obtener_acta_segmento(${dignidad_id},${junta_id} );`
    ); 
  }
}

