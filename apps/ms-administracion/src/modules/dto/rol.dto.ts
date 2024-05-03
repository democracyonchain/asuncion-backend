import {  stateWhereInput, stringWhereInput } from '@bsc/core';
import { InputType,  } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { PermisosDTO } from './permisos.dto';



export class RolDTO {

    @Allow()
    id: number;

    @Allow()
    nombre: string;

    @Allow()
    descripcion: string;   

    @Allow()
    permisos: [PermisosDTO];   
    
}

@InputType('RolFilterInput')
export class RolFilterInput {
  readonly nombre?: stringWhereInput;
  readonly estado?: stateWhereInput;

}

export class Rol {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
  }