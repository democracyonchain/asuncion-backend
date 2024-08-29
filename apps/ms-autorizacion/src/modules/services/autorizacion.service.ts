/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import {  HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
import { AuditLogManager } from '../manager/audit/audit-log.manager';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';

@Injectable()
export class AutorizacionService {

  private readonly isAudit = JSON.parse(process.env.AUDIT_AUTORIZACION)
  constructor(
      private readonly usuarioManager: UsuarioManager,
      private readonly moduloManager: ModuloManager,
      private readonly jwtService: JwtService,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly auditLogManager: AuditLogManager,
  ) { }

  async login(params: Userdata<Login>): Promise<LoginResult> {
    let username: string ="";
    let token: string = "";
    let provincia: string = "";
    let provincia_id: number = null;
    let establecimiento: {} = null;
    try {
        const dataUser = params.user;
        const userSearch = await this.usuarioManager.findByRelations(
          {
            select:{id:true,username:true,ultimoacceso:true,email:true,nombres:true,apellidos:true,password:true,
              provincia:{
              id:true,nombre:true,
              },
              establecimiento:{
                id:true,nombre:true,logo:true,
              }
            },
            where:{username:dataUser.username,estado:true,activo:true},
            relations: {provincia:true,establecimiento:true},
          }
        );
        const user = userSearch[0]
        if(user){
            const isPasswordValid = await bcryptjs.compare(dataUser.password, user.password);
            if (!isPasswordValid) {
              throw new UnauthorizedException("Contraseña invalida");
            }
            else{  
              user.ultimoacceso =  new Date();
              await this.usuarioManager.update(user);
              const payload = { email: user.email,nombres:user.nombres,apellidos:user.apellidos, id:user.id, provincia_id:user.provincia.id};
              token = await this.jwtService.signAsync(payload);
              username = user.username;
              provincia = user.provincia.nombre;
              establecimiento = userSearch[0].establecimiento;
              provincia_id = user.provincia.id
            }
        }
        else{
            throw new UnauthorizedException("El usuario no existe");
        }
    }
    catch (error) {
      Logger.error(error);
      throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message, 
      });
    }   
    return{username,token,provincia,establecimiento,provincia_id}
  }

  async perfil(params:  any): Promise<any> {
    await this.listaNegraTokenManager.validarToken(params.dataUser.token);
    const idUsuario = params.dataUser.user.id
    const fields = changeFalseToTrue(params.fields)
    const data = await this.usuarioManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: idUsuario,
        rolusuario:{
          estado:ConstantesAutorizacion.CT_ACTIVO,
          activo:ConstantesAutorizacion.CT_ACTIVO,
          rol:{
            activo:ConstantesAutorizacion.CT_ACTIVO,
            estado:ConstantesAutorizacion.CT_ACTIVO
          }
        }
      },
      relations: fields.relations,
    });
    return data[0]
  }

  async cambioPassword(params:  any): Promise<GlobalResult> {
    const idUsuario = (params.id)?params.id:params.dataUser.user.id
    const token = params.dataUser.token
    await this.listaNegraTokenManager.validarToken(token);
    let status: boolean = false;
    let message: string = `Problema al actualizar la contraseña`;
    try {
      const data = await this.usuarioManager.findByRelations({
        select:{id:true,password:true},
        where: {
          id: idUsuario,
          estado:ConstantesAutorizacion.CT_ACTIVO,
          activo:ConstantesAutorizacion.CT_ACTIVO
        },
      });
      if(data.length==1){
        data[0]['usuariomodificacion_id'] = idUsuario;
        data[0].password = await bcryptjs.hash(params.password, 10);
        if(params.id){
          data[0].passwordtemp = true;
        }else{
          data[0].passwordtemp = false;
        }
        const dataOld = {}
        const dataUpdate = plainToInstance(UsuarioEntity, data[0]);
        const result = await this.usuarioManager.update(dataUpdate);
        if(result){
          status = true;
          message = `Contraseña actualizada correctamente`;
          if(this.isAudit){
            await this.auditLogManager.logEvent('Edición','Usuario',params.dataUser.user.id,dataUpdate['id'],dataOld,dataUpdate);
          }
        }
      }
    }
    catch (error) {
      Logger.error(error);
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
        estado:ConstantesAutorizacion.CT_ACTIVO,
        activo:ConstantesAutorizacion.CT_ACTIVO,
        menu: {
          estado:ConstantesAutorizacion.CT_ACTIVO,
          activo:ConstantesAutorizacion.CT_ACTIVO,
          permisos:{
            rol_id:parseInt(idRol),
            estado:ConstantesAutorizacion.CT_ACTIVO,
            activo:ConstantesAutorizacion.CT_ACTIVO
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