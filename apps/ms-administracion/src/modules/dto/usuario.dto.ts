import { stringWhereInput, stateWhereInput } from '@bsc/core';

export class UsuarioFilterInput {
  readonly nombres?: stringWhereInput;
  readonly apellidos?: stringWhereInput;
  readonly nombreusuario?: stringWhereInput;
  readonly estado?: stateWhereInput;
}


export class Usuario {
    id: number;
    username: string;
    nombres: string;
    apellidos: string;
}


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