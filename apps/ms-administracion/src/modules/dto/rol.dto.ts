import {  stateWhereInput, stringWhereInput } from '@bsc/core';
import { PermisosDTO } from './permisos.dto';

export class RolDTO {
    id: number;
    nombre: string;
    descripcion: string;   
    permisos: [PermisosDTO];    
}

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