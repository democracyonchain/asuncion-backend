import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { contextType } from '../../constants';
import { manageLogsInterceptor } from '../../helpers';
import { ContextHttp, ContextRpc, RespuestaLog } from '../../interfaces';

@Injectable()
export class LogMsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //###############Interceptor para manejo de logs para peticiones HTTP / Api Rest###########
    if (context.getType() === contextType.http) {
      // Captura de la solicitud a través del contexto
      const request = context.switchToHttp().getRequest();

      // Captura del path del controlodor al cual está dirigida el request
      const url = request.url;

      // Captura de la IP a través de la request
      const ip = request.ip;

      // Captura del método Http usado (POST | GET | PUT | DELETE)
      const metodoHttp = request.method;

      // Preparación del objeto de respuesta con subtipo context HTTP
      const respuestaLog: RespuestaLog<ContextHttp> = {
        originIp: ip,
        context: { type: contextType.http, method: metodoHttp, url: url },
        statusCode: HttpStatus.OK,
        message: 'OK',
      };

      // Forma de responder cuando la respuesta ya se encuentra interceptada
      return next.handle().pipe(tap(() => manageLogsInterceptor(respuestaLog, context.getType())));

      //###############Interceptor para manejo de logs para peticiones Microservicios###########
    } else if (context.getType() === contextType.rpc) {
      // Cast Argumentos a tipo RPC
      const rpcArgumentHost = context.switchToRpc();

      // Captura de la solicitud a través del contexto
      const ctx = rpcArgumentHost.getContext<TcpContext>();

      // Captura de ip de origen cuando se realiza una solicitud a controlador MessagePattern
      const remoteAddress = ctx.getSocketRef().socket.remoteAddress;

      // Nombre que identifica a un controlador en microservicios | Incluido en Message Pattern (puede ser un string o un objeto)
      // const pattern = typeof ctx.getPattern() === 'string' ? ctx.getPattern() : JSON.parse(ctx.getPattern());
      const pattern = ctx.getPattern();

      // Preparación del objeto de respuesta con subtipo context RPC
      const respuestaLog: RespuestaLog<ContextRpc> = {
        originIp: remoteAddress,
        context: { type: contextType.rpc, pattern: pattern },
        statusCode: HttpStatus.OK,
        message: 'OK',
      };

      // Forma de responder cuando la respuesta ya se encuentra interceptada
      return next.handle().pipe(tap(() => manageLogsInterceptor(respuestaLog, context.getType())));
    }
  }
}
