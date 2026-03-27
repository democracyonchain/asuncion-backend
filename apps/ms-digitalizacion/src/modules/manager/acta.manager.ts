import { managePaginationArgs, ManagerBase, resetFilds, shuffleArray } from '@bsc/core';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ActaRepository } from '../repositories/acta.repository';
import { ActaEntity } from '../entities/acta.entity';
import { RpcException } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { DignidadEntity } from '../entities/dignidad.entity';
import { JuntaEntity } from '../entities/junta.entity';
import { ImagenSegmentoRepository } from '../repositories/imagen-segmento.repository';
import * as sharp from 'sharp';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Provincia } from '../dto/provincia.dto';
import { Canton } from '../dto/canton.dto';
import { Parroquia } from '../dto/parroquia.dto';
import { Zona } from '../dto/zona.dto';
import { Junta } from '../dto/junta.dto';
import { Acta } from '../dto/acta.dto';
import { Dignidad } from '../dto/dignidad.dto';
import { c } from 'locutus';





/**
 * Clase manager para gestión del entity de acta
 *
 * @export
 * @class ActaManager
 * @typedef {ActaManager}
 * @extends {ManagerBase<ActaEntity, ActaRepository>}
 */
@Injectable()
export class ActaManager extends ManagerBase<ActaEntity, ActaRepository> {
  constructor(
    private actaRepository: ActaRepository,
    private imagenSegmentoRepository: ImagenSegmentoRepository

  ) {
    super();
    this.repositoryEntity = actaRepository;
  }

  /**
 * Convierte un Buffer TIFF a un Buffer GIF
 *
 * @private
 * @async
 * @param {Buffer} bufferTiff - Buffer de la imagen TIFF
 * @returns {Promise<Buffer>} - Buffer de la imagen convertida a formato GIF
 */
  private async convertirTiffBufferAGif(bufferTiff: Buffer): Promise<Buffer> {
    try {
      // Validar que el buffer no esté vacío
      if (!bufferTiff || !Buffer.isBuffer(bufferTiff)) {
        Logger.error('El buffer TIFF está vacío o no es un Buffer válido');
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Buffer TIFF no válido',
        });
      }

      // Procesar la imagen con Sharp
      const bufferGif = await sharp(bufferTiff)
        .gif({
          effort: 3     // Compresión moderada
        })
        .toBuffer();

      return bufferGif;
    } catch (error) {
      Logger.error('Error al convertir buffer TIFF a GIF', error);
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al convertir imagen en memoria a formato GIF',
      });
    }
  }


  /**
   * Función para obtener un acta aleatoria
   *
   * @async
   * @param {number} usuarioId
   * @param {number} provinciaId
   * @param {number} dignidadId
   * @returns {unknown}
   */
  async actaAleatoria(usuarioId: number, provinciaId: number, dignidadId: number) {    
    const data: any = await this.actaRepository.actaAleatoria(usuarioId, provinciaId, dignidadId).catch(
      (error) => {
        Logger.error(error);
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
    
    if (data.length > 0) {

      const actaMapper = plainToClass(Acta, {
        id: data[0].acta_id,
        auxiliar:2,
        dignidad_id: data[0].acta_dignidad_id,
        junta_id: data[0].acta_junta_id,
        seguridad: data[0].acta_seguridad,
        estado: data[0].acta_estado,
        peticion: data[0].acta_peticion,
        sufragantesdigitacion: data[0].acta_sufragantesdigitacion,
        blancosdigitacion: data[0].acta_blancosdigitacion,
        nulosdigitacion: data[0].acta_nulosdigitacion,
        dignidad: plainToClass(Dignidad, {
          id: data[0].dignidad_id,
          nombre: data[0].dignidad_nombre,
        }),
        junta: plainToClass(Junta, {
          id: data[0].junta_id,
          junta: data[0].junta_junta,
          sexo: data[0].sexo,
          provincia: plainToClass(Provincia, {
            id: data[0].provincia_id,
            nombre: data[0].provincia_nombre,
          }),
          canton: plainToClass(Canton, {
            id: data[0].canton_id,
            nombre: data[0].canton_nombre,
          }),
          parroquia: plainToClass(Parroquia, {
            id: data[0].parroquia_id,
            nombre: data[0].parroquia_nombre,
          }),   
          zona: plainToClass(Zona, {
            zona_id: data[0].zona_id,
            parroquia_id: data[0].parroquia_id,
            nombre: data[0].zona_nombre,
          }),
        }),
      }); 
      let dataVotos = []
      const dataImagenSegmento: any = await this.imagenSegmentoRepository.getImagenSegmento(actaMapper.dignidad_id, actaMapper.junta_id).catch(
        (error) => {
          Logger.error(error);
          throw new RpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Problema al consultar las imagenes`,
          });
        },
      );
      if (dataImagenSegmento.length > 0) {
        for await (const element of data) {
          let valuesVoto = {};
          let valuesCandidato = {};
          const resultado = dataImagenSegmento.find((segmento: any) => segmento.candidato_id === element.candidato_id);
          if (resultado && resultado.imagen) {
            let bufferTiff: Buffer;

            try {
              bufferTiff = Buffer.from(resultado.imagen, 'base64');
            } catch (error) {
              Logger.error('Error al convertir imagen base64 a Buffer', error);
              throw new RpcException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Formato de imagen no válido',
              });
            }
            const imagenGif = await this.convertirTiffBufferAGif(bufferTiff);
            valuesVoto['imagensegmento'] = {
              imagen: imagenGif.toString('base64'),
              nombre: resultado.nombre,
              candidato_id: resultado.candidato_id,
              dignidad_id: resultado.dignidad_id
            };  
                            

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
      else {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `No se encuentran datos de la imagen segmento `,
        });
      }

      return actaMapper;

    }
    else {
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `No se encuentran datos de acta para digitación`,
      });
    }
  }

  /**
   * Función para actualizar los datos del acta cuando se escanea
   *
   * @async
   * @param {*} data
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateActaEscaneo(data: any, queryRunner: any) {
    await this.actaRepository.updateActaEscaneo(data, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }

  /**
   * Función para colección de acta
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion: any) {
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

  /**
   * Función para desbloquear el acta
   *
   * @async
   * @param {number} id_acta
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateLiberaActa(id_acta: number, queryRunner: any) {
    await this.actaRepository.updateLiberaActa(id_acta, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }

  /**
   * Función para obtener un acta aleatoria
   *
   * @async
   * @param {number} usuarioId
   * @param {number} provinciaId
   * @param {number} dignidadId
   * @returns {unknown}
   */
  async actaAleatoriaControl(usuarioId: number, provinciaId: number, dignidadId: number) {
    const data: any = await this.actaRepository.actaAleatoriaControl(usuarioId, provinciaId, dignidadId).catch(
      (error) => {
        Logger.error(error);
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
    
    if (data.length > 0) {
      console.log('data-antes',data);
      const actaMapper = plainToClass(Acta, {
        id: data[0].acta_id,
        dignidad_id: data[0].acta_dignidad_id,
        junta_id: data[0].acta_junta_id,
        seguridad: data[0].acta_seguridad,
        estado: data[0].acta_estado,
        peticion: data[0].acta_peticion,
        sufragantesdigitacion: data[0].acta_sufragantesdigitacion,
        blancosdigitacion: data[0].acta_blancosdigitacion,
        nulosdigitacion: data[0].acta_nulosdigitacion,
        dignidad: plainToClass(Dignidad, {
          id: data[0].dignidad_id,
          nombre: data[0].dignidad_nombre,
        }),
       
          junta: plainToClass(Junta, {
          id: data[0].junta_id,
          junta: data[0].junta_junta,
          sexo: data[0].sexo,
          provincia: plainToClass(Provincia, {
            id: data[0].provincia_id,
            nombre: data[0].provincia_nombre,
          }),
          canton: plainToClass(Canton, {
            id: data[0].canton_id,
            nombre: data[0].canton_nombre,
          }),
          parroquia: plainToClass(Parroquia, {
            id: data[0].parroquia_id,
            nombre: data[0].parroquia_nombre,
          }),   
          zona: plainToClass(Zona, {
            zona_id: data[0].zona_id,
            parroquia_id: data[0].parroquia_id,
            nombre: data[0].zona_nombre,
          }),
        }),
       
      });
      let dataVotos = []
      const dataImagenSegmento: any = await this.imagenSegmentoRepository.getImagenSegmentoControl(actaMapper.dignidad_id, actaMapper.junta_id).catch(
        (error) => {
          Logger.error(error);
          throw new RpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Problema al consultar las imagenes`,
          });
        },
      );
      if (dataImagenSegmento.length > 0) {
        for await (const element of data) {
          let valuesVoto = {};
          let valuesCandidato = {};
          const resultado = dataImagenSegmento.find((segmento: any) => segmento.candidato_id === element.candidato_id);
          if (resultado && resultado.imagen) {
            let bufferTiff: Buffer;

            try {
              bufferTiff = Buffer.from(resultado.imagen, 'base64');
            } catch (error) {
              Logger.error('Error al convertir imagen base64 a Buffer', error);
              throw new RpcException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Formato de imagen no válido',
              });
            }
            const imagenGif = await this.convertirTiffBufferAGif(bufferTiff);
            valuesVoto['imagensegmento'] = {
              imagen: imagenGif.toString('base64'),
              nombre: resultado.nombre,
              candidato_id: resultado.candidato_id,
              dignidad_id: resultado.dignidad_id
            };  
                            

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
      else {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `No se encuentran datos de la imagen segmento `,
        });
      }

      return actaMapper;

    }
    else {
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `No se encuentran datos de acta para control de calidad`,
      });
    }
  }

  /**
   * Función para cambiar de estado del acta
   *
   * @async
   * @param {number} id_acta
   * @param {string} tx_hash
   * @param {number} fase
   * @param {*} queryRunner
   * @returns {*}
   */
  async updateEstadoActa(id_acta: number,fase:number, tx_hash:string,queryRunner: any) {
    await this.actaRepository.updateEstadoActa(id_acta,fase,tx_hash, queryRunner).catch(
      (error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      },
    );
  }


}