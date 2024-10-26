import { stringWhereInput, stateWhereInput } from '@bsc/core';

/**
 * DTO para filtrar la coleccioń de usuario
 *
 * @export
 * @class UsuarioFilterInput
 * @typedef {UsuarioFilterInput}
 */
export class UsuarioFilterInput {
  readonly nombres?: stringWhereInput;
  readonly apellidos?: stringWhereInput;
  readonly nombreusuario?: stringWhereInput;
  readonly estado?: stateWhereInput;
}


/**
 * DTO de respuesta para entity de usuario
 *
 * @export
 * @class Usuario
 * @typedef {Usuario}
 */
export class Usuario {
    id: number;
    username: string;
    nombres: string;
    apellidos: string;
}


/**
 * DTO para insertar o actualizar datos de usuario
 *
 * @export
 * @class UsuarioDTO
 * @typedef {UsuarioDTO}
 */
export class UsuarioDTO {
  id: number;
  username: string;
  nombres: string;
  apellidos: string;
  password: string;
  email: string;
  roles: [number];
  provincia_id: number;
  establecimiento_id: number;
}