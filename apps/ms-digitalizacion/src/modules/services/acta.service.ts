import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CollectionType, GlobalResult, PayloadData, changeFalseToTrue} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { Acta, ActaBasic, ActaDTO } from '../dto/acta';
import { ActaManager } from '../manager/acta.manager';
import { RpcException } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { ImagenActaManager } from '../manager/imagen-acta.manager';
import { ImagenSegmentoManager } from '../manager/imagen-segmento.manager';
import { VotosManager } from '../manager/votos.manager';

/**
 * Clase con los diferentes servicios para consultar y persistir sobre el entity de acta
 *
 * @export
 * @class ActaService
 * @typedef {ActaService}
 */
@Injectable()
export class ActaService {
  
  
  constructor(
      private readonly actaManager: ActaManager,
      private readonly imagenActaManager: ImagenActaManager,
      private readonly imagenSegmentoManager: ImagenSegmentoManager,
      private readonly votosManager: VotosManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly datasource: DataSource,
  ) {}


  /**
   * Función que trar información del acta en función de la junta y dignidad
   *
   * @async
   * @param {*} filter
   * @returns {Promise<Acta>}
   */
  async actaByJunta(filter: any): Promise<Acta> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.actaManager.findByRelations({
      select: fields.dataTrue,
      where: {
        junta_id: filter.junta_id,
        dignidad_id: filter.dignidad_id,
      },
      relations:fields.relations,
      order:{
        votos:{
          candidato:{
            orden:'ASC'
          }
        }
      }
    });
    if(data.length>0){
      return plainToInstance(Acta, data[0]);
    }
    else{
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `No existen información`,
      });
    }    
  }

  /**
   * Función que trae un acta aleatoria para el proceso de digitalización
   *
   * @async
   * @param {*} filter
   * @returns {Promise<Acta>}
   */
  async actaByDignidad(filter: any): Promise<Acta> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const usuarioId = filter.usuarioAuth.user.id
    const provinciaId = filter.usuarioAuth.user.provincia_id
    const dignidadId = filter.dignidad_id
    const data = await this.actaManager.actaAleatoria(usuarioId,provinciaId,dignidadId)
    return plainToInstance(Acta, data);
  }

  /**
   * Función que actualiza los datos de acta, imagensegmento, imagenacta y votos durante el proceso de escaneo
   *
   * @async
   * @param {PayloadData<ActaDTO>} params
   * @returns {Promise<GlobalResult>}
   */
  async update(params:  PayloadData<ActaDTO>): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Error al momento de actualizar el acta`;
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const data = params.data;
    const imagenacta = data.imagenacta;
    delete data.imagenacta;
    const imagensegmento = data.imagensegmento;
    delete data.imagensegmento;
    const votos = data.votos;
    delete data.votos
    const dataActa = await this.actaManager.findOne({
      select:{junta_id:true,dignidad_id:true, estado:true},
      where:{id:data.id}
    })
    if(dataActa.estado==1){
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `El acta ya se encuentra actualizada`,
      });
    }
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.actaManager.updateActaEscaneo(data,queryRunner);
      await this.imagenActaManager.updateImagenActa(data.id, imagenacta,queryRunner);
      await this.imagenSegmentoManager.updateImagenSegmento(dataActa.junta_id,dataActa.dignidad_id,imagensegmento,queryRunner);
      await this.votosManager.updateVotosEscaneo(data.id,votos,queryRunner);
      await queryRunner.commitTransaction(); 
      status = true;
      message = `Acta actualizada correctamente`;
    }catch (error) {
      Logger.error(error);
      await queryRunner.rollbackTransaction(); 
      throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message, 
        });
    }
    finally {
      await queryRunner.release();
    }
    return { status, message };
  }

  /**
   * Función para obtener colección de acta
   *
   * @async
   * @param {*} paginacion
   * @returns {Promise<CollectionType<ActaBasic>>}
   */
  async getCollection(paginacion: any): Promise<CollectionType<ActaBasic>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.actaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<ActaBasic>, data);
  }

  /**
   * Función para desbloquear el acta
   *
   * @async
   * @param {*} params
   * @returns {Promise<GlobalResult>}
   */
  async updateLibera(params:  any): Promise<GlobalResult> {
    console.log(params.junta_id)
    let status: boolean = false;
    let message: string = `Error al momento de liberar el acta`;
    await this.listaNegraTokenManager.validarToken(params.usuarioAuth.token);
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const dataActa = await this.actaManager.findOne(
        {
          select:{id:true,bloqueo:true},
          where:{
            junta_id: params.junta_id,
            dignidad_id: params.dignidad_id
          }
        }
      )
      if(dataActa.bloqueo){
        await this.actaManager.updateLiberaActa(dataActa.id,queryRunner);
      }
      else{
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `El acta no se encuentra bloqueada`,
        });
      }
      await queryRunner.commitTransaction(); 
      status = true;
      message = `Acta liberada correctamente`;
    }catch (error) {
      Logger.error(error);
      await queryRunner.rollbackTransaction(); 
      throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message, 
        });
    }
    finally {
      await queryRunner.release();
    }
    return { status, message };

  }
}