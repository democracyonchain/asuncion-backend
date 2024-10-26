import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SelectQueryBuilder } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { UsuarioRepository } from '../repositories/usuario.repository';


/**
 * Clase manager para gestión del entity de usuario
 *
 * @export
 * @class UsuarioManager
 * @typedef {UsuarioManager}
 * @extends {ManagerBase<UsuarioEntity, UsuarioRepository>}
 */
@Injectable()
export class UsuarioManager extends ManagerBase<UsuarioEntity, UsuarioRepository> {
  constructor(private usuarioRepository: UsuarioRepository) {
    super();
    this.repositoryEntity = usuarioRepository;
  }

  /**
   * Función base que retorna data basica del usuario
   *
   * @returns {SelectQueryBuilder<UsuarioEntity>}
   */
  getCollectionQueryBuilder = (): SelectQueryBuilder<UsuarioEntity> => {
    return this.usuarioRepository.getBuildQueryBuilder('id');
  };

  /**
   * Función para colección de usuario
   *
   * @async
   * @param {*} paginacion
   * @returns {unknown}
   */
  async getCollection(paginacion:any) {
    const aliasEntity = 'usuario';
    const fields = paginacion.fields.data;
    const dataReset = resetFilds(fields, aliasEntity);
    const qb = await this.usuarioRepository.getCollection(dataReset);
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
}