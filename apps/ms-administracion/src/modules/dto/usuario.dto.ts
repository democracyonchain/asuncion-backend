import { stringWhereInput, stateWhereInput } from '@bsc/core';
import { Allow } from 'class-validator';

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
  @Allow()
  id: number;

  @Allow()
  username: string;

  @Allow()
  nombres: string;

  @Allow()
  apellidos: string;

  @Allow()
  password: string;

  @Allow()
  email: string;
  
  @Allow()
  roles: [number];

  @Allow()
  provincia_id: number;
}