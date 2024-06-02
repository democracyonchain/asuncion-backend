import { ManagerBase, managePaginationArgs, resetFilds } from '@bsc/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SelectQueryBuilder } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { UsuarioRepository } from '../repositories/usuario.respository';


@Injectable()
export class UsuarioManager extends ManagerBase<UsuarioEntity, UsuarioRepository> {
  constructor(private usuarioRepository: UsuarioRepository) {
    super();
    this.repositoryEntity = usuarioRepository;
  }
}