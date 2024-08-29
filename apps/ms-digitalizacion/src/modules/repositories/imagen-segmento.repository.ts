import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ImagenSegmentoEntity } from '../entities/imagen-segmento.entity';

type EntityFields = keyof ImagenSegmentoEntity;

@Injectable()
export class ImagenSegmentoRepository extends RepositoryOrmBase<ImagenSegmentoEntity> {
  protected entity: Constructable<ImagenSegmentoEntity> = ImagenSegmentoEntity;

  async updateImagenSegmento(junta_id:number, dignidad_id:number, data:any, queryRunner:any) {
    await queryRunner.query(
      `CALL actualizar_acta_segmento(${junta_id}, ${dignidad_id},${data.candidato_id},'${data.imagen}', '${data.nombre}', '${data.pathipfs}');`
    ); 
  }
}

