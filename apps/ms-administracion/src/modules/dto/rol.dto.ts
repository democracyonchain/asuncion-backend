import {  stateWhereInput, stringWhereInput } from '@bsc/core';
import { PermisosDTO } from './permisos.dto';

/**
 * DTO para insertar o actualizar datos de rol
 *
 * @export
 * @class RolDTO
 * @typedef {RolDTO}
 */
export class RolDTO {
    id: number;
    nombre: string;
    descripcion: string;   
    permisos: [PermisosDTO];    
}

/**
 * DTO para filtrar la coleccioń de rol
 *
 * @export
 * @class RolFilterInput
 * @typedef {RolFilterInput}
 */
export class RolFilterInput {
  readonly nombre?: stringWhereInput;
  readonly estado?: stateWhereInput;
}

/**
 * DTO de respuesta para entity de rol
 *
 * @export
 * @class Rol
 * @typedef {Rol}
 */
export class Rol {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
  }