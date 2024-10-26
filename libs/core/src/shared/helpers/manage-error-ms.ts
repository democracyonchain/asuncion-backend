import { RpcException } from '@nestjs/microservices';
import { Constantes } from '../constants/constantes';
/**
 * Función para manegar mensajes de error durante comunicación entre microservicios
 * @date 9/6/2022 - 12:42:00
 *
 * @export
 * @param {string} nombreMS
 * @param {*} err
 */
export function manageErrorMS(nombreMS: string, err: any) {
  const error = err?.error;
  let prepareMessageError = nombreMS + ': ' + (err?.message || error?.message.toString());
  if (error?.code == 'ECONNREFUSED') prepareMessageError = Constantes.ERROR_COMUNICACION_MICROSERVICIO;
  if (error) err.error.message = prepareMessageError;
  if (prepareMessageError.includes('ORA-00001')) return null;
  throw new RpcException(err?.error);
}
