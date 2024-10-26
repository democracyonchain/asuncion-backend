import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ImagenActaEntity } from '../entities/imagen-acta.entity';

type EntityFields = keyof ImagenActaEntity;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de imagenacta
 *
 * @export
 * @class ImagenActaRepository
 * @typedef {ImagenActaRepository}
 * @extends {RepositoryOrmBase<ImagenActaEntity>}
 */
@Injectable()
export class ImagenActaRepository extends RepositoryOrmBase<ImagenActaEntity> {
  protected entity: Constructable<ImagenActaEntity> = ImagenActaEntity;

  /**
   * Función que permite actualizar los datos de la imagenata
   *
   * @async
   * @param {number} acta_id
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateImagenActa(acta_id: number, data: any, queryRunner: any) {
    await queryRunner.query(
      `CALL actualizar_acta_imagen(${acta_id}, '${data.imagen}', '${data.nombre}', '${data.pathipfs}');`
    ); 
  }
}

