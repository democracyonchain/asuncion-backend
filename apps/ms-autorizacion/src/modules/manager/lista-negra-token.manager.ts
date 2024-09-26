import { ManagerBase } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ListaNegraTokenRepository } from '../repositories/lista-negra-token.repository';
import { ListaNegraTokenEntity } from '../entities/lista-negra-token.entity';
import { RpcException } from '@nestjs/microservices';


/**
 * Clase manager para gestión del entity de listanegra
 *
 * @export
 * @class ListaNegraTokenManager
 * @typedef {ListaNegraTokenManager}
 * @extends {ManagerBase<ListaNegraTokenEntity, ListaNegraTokenRepository>}
 */
@Injectable()
export class ListaNegraTokenManager extends ManagerBase<ListaNegraTokenEntity, ListaNegraTokenRepository> {
  constructor(private listaNegraTokenRepository: ListaNegraTokenRepository) {
    super();
    this.repositoryEntity = listaNegraTokenRepository;
  }

  /**
   * Función para validar que el token no se encuentre en la lista negra
   *
   * @async
   * @param {string} tokenValue
   * @returns {unknown}
   */
  async validarToken(tokenValue:string) {
    const valid = await this.findOneBy({token:tokenValue})
    if(valid){
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: `El Token es invalido`,
      });
    }
    return true
  }
}