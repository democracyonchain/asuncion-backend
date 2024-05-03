import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';
import { Constantes } from '../../constants/constantes';
import { contextType } from '../../constants/enum/context-type';
import { manageLogsHttp, manageLogsRpc } from '../../helpers/manage-logs';
import { ContextHttp, ContextRpc } from '../../interfaces/respuesta-log.interface';

//En Microservicios hibridos, se capturan mayoritariamente las excepciones de validaciones en DTO (class-validator)
@Catch(HttpException)
export class AllHttpExceptionMsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //###############Filtro para HTTP en excepciones tipo HttpException(Especificamente captura de errores de librería class-validator en DTOS)###########
    if (host.getType() === contextType.http) {
      // Contexto tipo Http /api rest
      const ctx = host.switchToHttp();

      // Captura de la respuesta a través del contexto
      const response = ctx.getResponse<Response>();

      // Captura de la solicitud a través del contexto
      const request = ctx.getRequest<Request>();

      // Captura del mensaje de respuesta incluida en la excepción tipo HttpException
      const responseMessage = exception.getResponse() as any;

      // Captura del path del controlodor al cual está dirigida el request
      const url = request.url;

      // Captura de la IP a través de la request
      const ip = request.ip;

      // Captura del Status Code directamente de la excepción al ser HttpException
      const status = exception.getStatus();

      // Captura del mensaje de error
      const message = responseMessage?.message || Constantes.INTERNAL_SERVER_ERROR;

      // Captura del método Http usado (POST | GET | PUT | DELETE)
      const metodoHttp = request.method;

      // Preparación del objeto tipo contexto para http (type, method, url)
      const contextRes: ContextHttp = { type: host.getType(), method: metodoHttp, url: url };

      // Uso del Helper manejo de logs para peticiones HTTP se incluye parametros (ip, contexto, status, message)
      manageLogsHttp(ip, contextRes, status, message);

      // Preparación del objeto de excepción estandarizado (error, path, timestamp)
      const excepcion = { error: responseMessage, path: request.url, timestamp: new Date() };

      // Forma de responder en peticiones HTTP / API Rest a través del Response capturado
      response.status(status).json(excepcion);

      //###############Filtro para RPC en excepciones tipo HttpException ###########
      //##Es necesario capturar porque en microservicios la librería class-validator ejecuta unicamente HTTPExceptions, mismo que tiene su forma de emitir una respuesta a través del response.status
      //##Sin embargo, para microservicios es necesario cambiar la forma de responder por return throwError, con sus respectivos objetos
    } else if (host.getType() === contextType.rpc) {
      // ==== Sección de propiedades de solicitudes para microservicios

      // Cast Argumentos a tipo RPC
      const argumentsRPC = host.switchToRpc();

      // Contexto tipo TCP / RPC (microservicios)
      const ctxRPC = argumentsRPC.getContext<TcpContext>();

      // Captura de ip de origen cuando se realiza una solicitud en microservicios (Gateway la mayor parte de tiempo)
      const remoteAddress = ctxRPC.getSocketRef().socket.remoteAddress;

      // Nombre que identifica a un controlador en microservicios | Incluido en Message Pattern (puede ser un string o un objeto)
      const pattern = ctxRPC.getPattern();

      // ==== Sección de propiedades de http original (Obtenido por HttpException)

      // Contexto tipo Http /api rest
      const ctx = host.switchToHttp();

      // Captura de la solicitud a través del contexto
      const request = ctx.getRequest<Request>();

      // Captura del mensaje de respuesta incluida en la excepción tipo HttpException
      const responseMessage = exception.getResponse() as any;

      // Captura del Status Code directamente de la excepción al ser HttpException
      const status = exception.getStatus();

      // Captura del mensaje de error
      const message = responseMessage?.message || Constantes.INTERNAL_SERVER_ERROR;

      // Preparación del objeto tipo contexto para http (type, method, url)
      const contextRes: ContextRpc = { type: host.getType(), pattern: pattern };

      // Uso del Helper manejo de logs para peticiones a microservicios
      manageLogsRpc(remoteAddress, contextRes, status, message);

      // Preparación del objeto de excepción estandarizado (error, path, timestamp)
      const excepcion = { error: responseMessage, path: request.url, timestamp: new Date() };

      // Forma de responder en peticiones a Microservicios
      return throwError(() => excepcion);
    }
  }
}
