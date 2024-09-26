import { ManagerBase } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ImagenActaRepository } from '../repositories/imagen-acta.repository';
import { ImagenActaEntity } from '../entities/imagen-acta.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de imagenacta
 *
 * @export
 * @class ImagenActaManager
 * @typedef {ImagenActaManager}
 * @extends {ManagerBase<ImagenActaEntity, ImagenActaRepository>}
 */
@Injectable()
export class ImagenActaManager extends ManagerBase<ImagenActaEntity, ImagenActaRepository> {
  constructor(private imagenActaRepository: ImagenActaRepository) {
    super();
    this.repositoryEntity = imagenActaRepository;
  }

  /**
   * Función para actualizar la imagen del acta
   *
   * @async
   * @param {number} acta_id
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateImagenActa(acta_id:number, data:any,queryRunner:any) {
    await this.imagenActaRepository.updateImagenActa(acta_id, data, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }

}