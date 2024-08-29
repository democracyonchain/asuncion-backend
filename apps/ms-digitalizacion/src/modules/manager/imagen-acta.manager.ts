import { ManagerBase } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ImagenActaRepository } from '../repositories/imagen-acta.repository';
import { ImagenActaEntity } from '../entities/imagen-acta.entity';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class ImagenActaManager extends ManagerBase<ImagenActaEntity, ImagenActaRepository> {
  constructor(private imagenActaRepository: ImagenActaRepository) {
    super();
    this.repositoryEntity = imagenActaRepository;
  }

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