/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import {  HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UsuarioManager } from '../manager/usuario.manager';
import { LoginResult, GlobalResult, Userdata, changeFalseToTrue } from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import * as bcryptjs from "bcryptjs";
import { Login } from '../dto/login.dto';
import { JwtService } from "@nestjs/jwt";
import { UsuarioEntity } from '../entities/usuario.entity';
import { ModuloManager } from '../manager/modulo.manager';
import { Modulo } from '../dto/modulo.object';
import { ListaNegraTokenEntity } from '../entities/lista-negra-token.entity';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';

@Injectable()
export class AutorizacionService {
  constructor(
      private readonly usuarioManager: UsuarioManager,
      private readonly moduloManager: ModuloManager,
      private readonly jwtService: JwtService,
      private readonly listaNegraTokenManager: ListaNegraTokenManager
  ) { }

  async login(params: Userdata<Login>): Promise<LoginResult> {
    let username: string ="";
    let token: string = "";
    try {
        const dataUser = params.user;
        const user = await this.usuarioManager.findOneBy({username:dataUser.username,estado:true});
        if(user){
            const isPasswordValid = await bcryptjs.compare(dataUser.password, user.password);
            if (!isPasswordValid) {
              throw new UnauthorizedException("Contraseña invalida");
            }
            else{  
              user.ultimoacceso =  new Date();
              const result = await this.usuarioManager.update(user);
              const payload = { email: user.email,nombres:user.nombres,apellidos:user.apellidos, id:user.id};
              token = await this.jwtService.signAsync(payload);
              username = user.username;
            }
        }
        else{
            throw new UnauthorizedException("El usuario no existe");
        }
    }
    catch (error) {
        throw new RpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message, 
        });
    }
    return{username,token}
  }

  async perfil(params:  any): Promise<any> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const idUsuario = params.dataUser.user.id
    const fields = changeFalseToTrue(params.fields)
    const data = await this.usuarioManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: idUsuario,
      },
      relations: fields.relations,
    });
    return data[0]
  }

  async cambioPassword(params:  any): Promise<GlobalResult> {
    const idUsuario = params.dataUser.user.id
    const token = params.dataUser.token
    await this.listaNegraTokenManager.validarToken(token);
    let status: boolean = false;
    let message: string = `Problema al actualizar la contraseña`;
    try {
      const data = await this.usuarioManager.findByRelations({
        select:{id:true,password:true},
        where: {
          id: idUsuario,
        },
      });
      if(data.length==1){
        data[0]['usuariomodificacion_id'] = idUsuario;
        data[0].password = await bcryptjs.hash(params.password, 10);
        const dataUpdate = plainToInstance(UsuarioEntity, data[0]);
        const result = await this.usuarioManager.update(dataUpdate);
        if(result){
          status = true;
          message = `Contraseña actualizada correctamente`;
        }
      }
    }
    catch (error) {
      status = false;
      message = error.message;
    }
    return { status, message };
  }
  
  async moduloPermiso(params:  any): Promise<Modulo[]> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const idRol = params.rol_id;
    const fields = changeFalseToTrue(params.fields)
    const data = await this.moduloManager.findByRelations({
      select:fields.dataTrue,
      where: {
        menu: {
          permisos:{
            rol_id:parseInt(idRol)
          }
        },
      },
      relations: fields.relations,
    });
    return plainToInstance(Modulo, data);
  }

  async authlogout(params:any): Promise<GlobalResult> {
    let status: boolean = false;
    let message: string = `Problemas para terminar la sesión`;
    let dataToken =  new ListaNegraTokenEntity()
    dataToken.token = params.dataUser.token
    const result = await this.listaNegraTokenManager.insert(dataToken);
    if(result){
      status = true;
      message = `Sesión finalizada`;
    }
    return { status, message };
  }
}