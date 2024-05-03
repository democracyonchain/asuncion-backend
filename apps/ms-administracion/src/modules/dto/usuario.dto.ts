import { stringWhereInput, numberWhereInput } from '@bsc/core';
import { Field, InputType } from "@nestjs/graphql";
import { Allow } from 'class-validator';

export class UsuarioFilterInput {
  readonly nombres?: stringWhereInput;
  readonly apellidos?: stringWhereInput;
  readonly nombreusuario?: stringWhereInput;
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
}