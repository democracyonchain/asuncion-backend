import { Allow } from 'class-validator';

import { ConnectionInput } from '../dto/input-type/connection.args.dto';
import { StringOrderInput } from './input-type/string-order.dto';
import { RespuestaJWTToken } from '../interfaces';

/**
 * Filtro con tipado genérico en where (Aquí van clases de tipo Filter Input para GraphQL)
 * @date 26/10/2022 - 10:19:16
 *
 * @type {?ConnectionInput}
 */
export class FilterDto<T> {
  @Allow()
  pagination?: ConnectionInput;
  @Allow()
  where?: T;
  @Allow()
  order?: StringOrderInput;
  @Allow()
  fields?: any;
  @Allow()
  usuarioAuth?: RespuestaJWTToken;
}

export class FilterById{
  @Allow()
  id:number
  @Allow()
  fields?: any;
  @Allow()
  usuarioAuth?: RespuestaJWTToken;
}


export class FilterByIdUser{
  @Allow()
  id:number
}