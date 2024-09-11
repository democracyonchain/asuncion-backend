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
    return plainToInstance(Acta, data[0]);
  }

  async actaByDignidad(filter: any): Promise<Acta> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const usuarioId = filter.usuarioAuth.user.id
    const provinciaId = filter.usuarioAuth.user.provincia_id
    const dignidadId = filter.dignidad_id
    const data = await this.actaManager.actaAleatoria(usuarioId,provinciaId,dignidadId)
    return plainToInstance(Acta, data);
  }

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

  async getCollection(paginacion: any): Promise<CollectionType<ActaBasic>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.actaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<ActaBasic>, data);
  }

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