import { ManagerBase } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ImagenSegmentoRepository } from '../repositories/imagen-segmento.repository';
import { ImagenSegmentoEntity } from '../entities/imagen-segmento.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de imagensegmento
 *
 * @export
 * @class ImagenSegmentoManager
 * @typedef {ImagenSegmentoManager}
 * @extends {ManagerBase<ImagenSegmentoEntity, ImagenSegmentoRepository>}
 */
@Injectable()
export class ImagenSegmentoManager extends ManagerBase<ImagenSegmentoEntity, ImagenSegmentoRepository> {
  constructor(private imagenSegmentoRepository: ImagenSegmentoRepository) {
    super();
    this.repositoryEntity = imagenSegmentoRepository;
  }

  /**
   * Función para actualizar la imagen-segmento
   *
   * @async
   * @param {number} junta_id
   * @param {number} dignidad_id
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateImagenSegmento(junta_id:number, dignidad_id:number, data:any,queryRunner:any) {
    for await (const element of data){
        await this.imagenSegmentoRepository.updateImagenSegmento(junta_id, dignidad_id, element, queryRunner).catch(
            (error) => {
              throw new RpcException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
              });
            },
        );
    }
  }

}