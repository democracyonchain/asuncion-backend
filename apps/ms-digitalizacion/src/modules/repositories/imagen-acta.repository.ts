import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ImagenActaEntity } from '../entities/imagen-acta.entity';

type EntityFields = keyof ImagenActaEntity;

@Injectable()
export class ImagenActaRepository extends RepositoryOrmBase<ImagenActaEntity> {
  protected entity: Constructable<ImagenActaEntity> = ImagenActaEntity;

  async updateImagenActa(acta_id: number, data: any, queryRunner: any) {
    await queryRunner.query(
      `CALL actualizar_acta_imagen(${acta_id}, '${data.imagen}', '${data.nombre}', '${data.pathipfs}');`
    ); 
  }
}

