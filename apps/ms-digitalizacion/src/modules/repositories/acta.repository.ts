import { Constructable, RepositoryOrmBase } from '@bsc/core';
import {  Injectable } from '@nestjs/common';
import { ActaEntity } from '../entities/acta.entity';
import { DignidadEntity } from '../entities/dignidad.entity';
import { JuntaEntity } from '../entities/junta.entity';
import { plainToClass } from 'class-transformer';

type EntityFields = keyof ActaEntity;

@Injectable()
export class ActaRepository extends RepositoryOrmBase<ActaEntity> {
  protected entity: Constructable<ActaEntity> = ActaEntity;

  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId:number): Promise<ActaEntity> {
    const data = await this.getRepository().query(
      `SELECT * FROM devolver_y_actualizar_acta(${provinciaId},${usuarioId},${dignidadId});`
    ); 
    const actaMapper = plainToClass(ActaEntity,{
      id:data[0].acta_id,
      dignidad_id:data[0].acta_dignidad_id,
      junta_id:data[0].acta_junta_id,
      seguridad:data[0].acta_seguridad,
      estado:data[0].acta_estado,
      peticion:data[0].acta_peticion,
      sufragantesdigitacion:data[0].acta_sufragantesdigitacion,
      blancosdigitacion:data[0].acta_blancosdigitacion,
      nulosdigitacion:data[0].acta_nulosdigitacion,
      dignidad: plainToClass(DignidadEntity,{
          id:data[0].dignidad_id,
          nombre: data[0].dignidad_nombre,
        }),
      junta: plainToClass(JuntaEntity,{
          id:data[0].junta_id,
          junta: data[0].junta_junta,
        }),
    });
    let dataVotos = []
    for await (const element of data){
      let valuesVoto = {}
      let valuesCandidato = {}
      valuesVoto['votosdigitacion'] = element.votos_votosdigitacion,
      valuesVoto['candidato_id'] = element.votos_candidato_id,
      valuesCandidato['id'] = element.candidato_id
      valuesCandidato['cedula'] = element.candidato_cedula
      valuesCandidato['nombre'] = element.candidato_nombre
      valuesVoto['candidato'] = valuesCandidato
      dataVotos.push(valuesVoto)
    };
    actaMapper['votos'] = dataVotos;
    return actaMapper;
  }

  async updateActaEscaneo(data: any, queryRunner: any) {
    await queryRunner.query(
      `CALL actualizar_acta_escaneo(${data.blancos}, ${data.id}, ${data.nulos}, ${data.sufragantes});`
    ); 
  }
}

