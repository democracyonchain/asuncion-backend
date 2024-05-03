import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException, TcpContext } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

import { Constantes } from '../../constants/constantes';
import { contextType } from '../../constants/enum/context-type';
import { manageLogsHttp, manageLogsRpc } from '../../helpers/manage-logs';
import { ContextHttp, ContextRpc, RespuestaError } from '../../interfaces/respuesta-log.interface';

// Se captura todas las RPCException mayormente generadas por reglas del negocio
@Catch(RpcException)
export class AllRpcExceptionMsFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    //###############Filtro para HTTP en excepciones tipo RPCException###########
    if (host.getType() === contextType.http) {
      // Contexto tipo Http /api rest
      const ctx = host.switchToHttp();

      // Captura de la respuesta a través del contexto
      const response = ctx.getResponse<Response>();

      // Captura de la solicitud a través del contexto
      const request = ctx.getRequest<Request>();

      // Captura del error a través de la excepción (ESTO APLICA SOLO AQUÍ, EN UN GATEWAY O EN HTTPEXCEPTION ES NECESARIO CAPTURAR exception.getResponse())
      const error = exception.getError() as RespuestaError;

      // Captura del path del controlodor al cual está dirigida el request
      const url = request.url;

      // Captura de la IP a través de la requestd
      const ip = request.ip;

      // Captura del Status code del error
      const status = error?.statusCode;

      // Captura del mensaje de error
      const message = error?.message || Constantes.INTERNAL_SERVER_ERROR;

      // Captura del método Http usado (POST | GET | PUT | DELETE)
      const metodoHttp = request.method;

      // Preparación del objeto tipo contexto para http (type, method, url)
      const contextRes: ContextHttp = { type: host.getType(), method: metodoHttp, url: url };

      // Uso del Helper manejo d elogs para peticiones HTTP se incluye parametros (ip, contexto, status, message)
      manageLogsHttp(ip, contextRes, status, message);

      // Preparación del objeto de excepción estandarizado (error, path, timestamp)
      const excepcion = { error: error, path: request.url, timestamp: new Date() };

      // Forma de responder en peticiones HTTP / API Rest a través del Response capturado
      response.status(status).json(excepcion);

      //###############Filtro para RPC en excepciones tipo RPCException###########
    } else if (host.getType() === contextType.rpc) {
      // Cast Argumentos a tipo RPC
      const argumentsRPC = host.switchToRpc();

      // Contexto tipo TCP / RPC (microservicios)
      const ctx = argumentsRPC.getContext<TcpContext>();

      // Captura de ip de origen cuando se realiza una solicitud a controlador MessagePattern
      const remoteAddress = ctx.getSocketRef().socket.remoteAddress;

      // Nombre que identifica a un controlador en microservicios | Incluido en Message Pattern (puede ser un string o un objeto)
      const pattern = ctx.getPattern();

      // Captura del error en un RPCExcepction
      const error = exception.getError() as RespuestaError;

      // Captura del StatusCode Que se incluye en objeto de error para manejo de estándar de errores
      const status = error?.statusCode;

      // Captura del mensaje de error
      const message = error?.message || Constantes.INTERNAL_SERVER_ERROR;

      // Preparación del objeto tipo contexto para http (type, method, url)
      const contextRes: ContextRpc = { type: host.getType(), pattern: pattern };

      // Uso del Helper manejo de logs para peticiones a microservicios
      manageLogsRpc(remoteAddress, contextRes, status, message);

      // Forma de responder en peticiones a Microservicios
      return throwError(() => exception);
    }
  }
}
