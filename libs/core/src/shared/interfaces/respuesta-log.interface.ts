import { contextType } from '../constants/enum/context-type';

/**
 * Interfaz de respuesta para crear LOGS
 * @date 9/6/2022 - 14:56:08
 *
 * @export
 * @interface RespuestaLog
 * @typedef {RespuestaLog}
 */
export interface RespuestaLog<T> {
  /**
   * Ip de origen de solicitud
   * @date 9/6/2022 - 14:56:08
   *
   * @type {string}
   */
  originIp?: string;
  /**
   * Usuario autenticado en las solicitudes protegidas
   * @date 9/6/2022 - 14:56:08
   *
   * @type {string}
   */
  userAuth?: string;
  /**
   * Endpoint de acceso
   * @date 9/6/2022 - 14:56:08
   *
   * @type {string}
   */
  context: T;
  /**
   * Objeto de error anidado
   * @date 9/6/2022 - 14:56:08
   *
   * @type {?RespuestaError}
   */
  error?: RespuestaError;

  timestamp?: string;

  statusCode: number;
  message: string;
}

/**
 * Interfaz Respuesta Error
 * @date 9/6/2022 - 14:56:08
 *
 * @export
 * @interface RespuestaError
 * @typedef {RespuestaError}
 */
export interface RespuestaError {
  /**
   * Código de estado del error
   * @date 9/6/2022 - 14:56:08
   *
   * @type {?number}
   */
  statusCode?: number;
  /**
   * Descripción del error
   * @date 9/6/2022 - 14:56:08
   *
   * @type {?string}
   */
  message?: string;
}

/**
 * Interfaz contexto de la petición tipo RPC (Microservicios)
 * @date 20/9/2022 - 11:08:56
 *
 * @export
 * @interface ContextRpc
 * @typedef {ContextRpc}
 */
export interface ContextRpc {
  /**
   * Tipo de la petición: enum: http | rpc | graphql
   * @date 20/9/2022 - 11:08:56
   *
   * @type {contextType}
   */
  type: contextType;
  /**
   * Nombre identificador de un controlador en Microservicio @MessagePattern
   * @date 20/9/2022 - 11:08:56
   *
   * @type {string}
   */
  pattern: string;
}

/**
 * Interfaz contexto de la petición tipo HTTP (API REST)
 * @date 20/9/2022 - 11:08:56
 *
 * @export
 * @interface ContextHttp
 * @typedef {ContextHttp}
 */
export interface ContextHttp {
  /**
   * Tipo de la petición: enum: http | rpc | graphql
   * @date 20/9/2022 - 11:08:56
   *
   * @type {contextType}
   */
  type: contextType;
  /**
   * Operación Http: Get | Post | Put | Delete | Patch | etc
   * @date 20/9/2022 - 11:08:56
   *
   * @type {string}
   */
  method: string;
  /**
   * Path del api a la cual se accede
   * @date 20/9/2022 - 11:08:56
   *
   * @type {string}
   */
  url: string;
}

/**
 * Interfaz contexto de la petición tipo GRAPHQL
 * @date 20/9/2022 - 11:08:56
 *
 * @export
 * @interface ContextGraphql
 * @typedef {ContextGraphql}
 */
export interface ContextGraphql {
  /**
   * Tipo de la petición: enum: http | rpc | graphql
   * @date 20/9/2022 - 11:08:56
   *
   * @type {contextType}
   */
  type: contextType;
  /**
   * Operación Graphql: Query | Mutation
   * @date 20/9/2022 - 11:08:56
   *
   * @type {string}
   */
  parentType: string;
  /**
   * Field graphql a la cual se accede
   * @date 20/9/2022 - 11:08:56
   *
   * @type {string}
   */
  fieldName: string;
}
