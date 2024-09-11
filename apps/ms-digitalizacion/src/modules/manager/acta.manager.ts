import { managePaginationArgs, ManagerBase, resetFilds, shuffleArray } from '@bsc/core';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ActaRepository } from '../repositories/acta.repository';
import { ActaEntity } from '../entities/acta.entity';
import { RpcException } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { DignidadEntity } from '../entities/dignidad.entity';
import { JuntaEntity } from '../entities/junta.entity';
import { ImagenSegmentoRepository } from '../repositories/imagen-segmento.repository';

@Injectable()
export class ActaManager extends ManagerBase<ActaEntity, ActaRepository> {
  constructor(
    private actaRepository: ActaRepository,
    private imagenSegmentoRepository: ImagenSegmentoRepository

  ) {
    super();
    this.repositoryEntity = actaRepository;
  }

  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId:number) {
    const data:any = await this.actaRepository.actaAleatoria(usuarioId, provinciaId, dignidadId).catch(
      (error) => {
        Logger.error(error);
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
    if(data.length>0){
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
      const dataImagenSegmento:any = await this.imagenSegmentoRepository.getImagenSegmento(actaMapper.dignidad_id, actaMapper.junta_id).catch(
        (error) => {
          Logger.error(error);
          throw new RpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Problema al consultar las imagenes`,
          });
        },
      );
      if(dataImagenSegmento.length>0){
        for await (const element of data){
          let valuesVoto = {};
          let valuesCandidato = {};
          const resultado = dataImagenSegmento.find((segmento:any) => segmento.candidato_id === element.candidato_id);
          if(resultado){
            valuesVoto['imagensegmento'] = resultado
          }
          valuesVoto['votosdigitacion'] = element.votos_votosdigitacion,
          valuesVoto['candidato_id'] = element.votos_candidato_id,
          valuesCandidato['id'] = element.candidato_id
          valuesCandidato['cedula'] = element.candidato_cedula
          valuesCandidato['nombre'] = element.candidato_nombre
          valuesVoto['candidato'] = valuesCandidato
          dataVotos.push(valuesVoto)
        };
        actaMapper['votos'] = shuffleArray(dataVotos);
      }
      else{
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `No se encuentran datos de la imagen segmento `,
        });
      }
     
      return actaMapper;
      
    }
    else{
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `No se encuentran datos de acta `,
      });
    }  
  }

  async updateActaEscaneo(data:any,queryRunner:any) {
    await this.actaRepository.updateActaEscaneo(data, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }

  async getCollection(paginacion:any) {
    const aliasEntity = 'acta';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.actaRepository.getCollection(dataReset);
    const data = await managePaginationArgs(aliasEntity, qb, paginacion).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
    return data;
  }

  async updateLiberaActa(id_acta:number,queryRunner:any) {
    await this.actaRepository.updateLiberaActa(id_acta, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }

}