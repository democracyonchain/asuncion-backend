/**
 * DTO de respuesta para entity de Login
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
 * DTO para actualizar información de usuario
 *
 * @export
 * @class UsuarioDTO
 * @typedef {UsuarioDTO}
 */
export class UsuarioDTO {
    id: number;
    password: string;
  }