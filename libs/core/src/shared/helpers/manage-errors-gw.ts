import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Constantes } from '../constants/constantes';

/**
 * Función para manejar excepciones con códigos de estado de error http
 * @date 9/6/2022 - 12:42:00
 *
 * @export
 * @param {string} nombreMS
 * @param {*} err
 */
export function manageErrorsGw(nombreMS: string, err: any) {
  const error = err?.error;

  // Error: 500. InternalServerErrorException. Error de comunicación con el microservicio
  if (!error) throw new InternalServerErrorException(`${nombreMS}: ${Constantes.ERROR_COMUNICACION_MICROSERVICIO}`);

  if (!error || !error?.statusCode || error?.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
    throw new InternalServerErrorException(`${nombreMS}: ${error?.message}`);

  const message = error?.message as string;
  if (message.startsWith('ORA - 12545') || message.startsWith('ORA-12545')) {
    throw new InternalServerErrorException(`${nombreMS}: Problemas de comunicación con la BDD: ${error?.message}`);
  }
  // Error: 402. NotFoundException
  if (error?.statusCode == HttpStatus.NOT_FOUND) throw new NotFoundException(`${nombreMS}: ${message}`);

  // Error: 409. ConflictException
  if (error?.statusCode == HttpStatus.CONFLICT) throw new ConflictException(`${nombreMS}: ${message}`);

  // Error: 400. BadRequestException
  if (error?.statusCode == HttpStatus.BAD_REQUEST) throw new BadRequestException(`${nombreMS}: ${message}`);

  // Error: 401. UnauthorizedException
  if (error?.statusCode == HttpStatus.UNAUTHORIZED) throw new UnauthorizedException(`${nombreMS}: ${message}`);

  // Error: 422. UNPROCESSABLE_ENTITY
  if (error?.statusCode == HttpStatus.UNPROCESSABLE_ENTITY)
    throw new UnprocessableEntityException(`${nombreMS}: ${message}`);

  // Error: 503. UnauthorizedException
  if (error?.statusCode == HttpStatus.SERVICE_UNAVAILABLE)
    throw new ServiceUnavailableException(`${nombreMS}: ${message}`);

  //Por defecto si no entra en las otras excepciones
  throw new InternalServerErrorException(`${nombreMS}: ${message}`);
}
