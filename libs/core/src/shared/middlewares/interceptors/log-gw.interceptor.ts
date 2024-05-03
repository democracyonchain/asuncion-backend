import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { contextType } from '../../constants/enum/context-type';
import { manageLogsInterceptor } from '../../helpers/manage-logs';
import { RespuestaJWT } from '../../interfaces/respuesta-jwt.interface';
import { ContextGraphql, ContextHttp, RespuestaLog } from '../../interfaces/respuesta-log.interface';

@Injectable()
export class LogGwInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //###############Interceptor en Gateway para manejo de logs para peticiones HTTP / Api Rest###########
    if (context.getType() === 'http') {
      // Captura de la solicitud a través del contexto
      const request = context.switchToHttp().getRequest();

      //Usuario de Keycloak capturado obtenido por header token Bearer (Usando librería de keycloak)
      const userKC = request?.user as RespuestaJWT;

      // Captura del path del controlodor al cual está dirigida el request
      const url = request.url;

      // Captura de la IP a través de la request
      const ip = request.ip;

      // Captura del método Http usado (POST | GET | PUT | DELETE)
      const metodoHttp = request.method;

      // Captura del username unicamente si se hacen peticiones autenticado
      const username = userKC?.nombres || 'Usuario no autenticado';

      // Preparación del objeto de respuesta con subtipo context HTTP
      const respuestaLog: RespuestaLog<ContextHttp> = {
        originIp: ip,
        userAuth: username,
        context: { type: contextType.http, method: metodoHttp, url: url },
        statusCode: HttpStatus.OK,
        message: 'OK',
      };

      // Forma de responder cuando la respuesta ya se encuentra interceptada tipo http
      return next.handle().pipe(tap(() => manageLogsInterceptor(respuestaLog, context.getType())));

      //###############Interceptor en Gateway para manejo de logs para peticiones HTTP / GRAPHQL###########
    } else if (context.getType<GqlContextType>() === 'graphql') {
      // Contexto tipo Http / Graphql
      const ctx = GqlExecutionContext.create(context);

      //Usuario de Keycloak capturado obtenido por header token Bearer (Usando librería de keycloak)
      const userKC = ctx.getContext().req?.user as RespuestaJWT;

      // Captura de la solicitud a través del contexto
      const request = ctx.getContext().req as Request;

      // Captura de la IP a través de la request
      const ip = request.ip;

      // Captura del Field GraphQL a cual se accede (nombre del Controlador de Query o Mutation)
      const fieldName = ctx.getInfo()?.fieldName;

      // Captura la operación GraphQL (Query | Mutation)
      const parentType = ctx.getInfo()?.parentType;

      // Captura del username unicamente si se hacen peticiones autenticado
      const username = userKC?.nombres || 'Usuario no autenticado';

      // Preparación del objeto de respuesta con subtipo context HTTP
      const respuestaLog: RespuestaLog<ContextGraphql> = {
        originIp: ip,
        userAuth: username,
        context: { type: contextType.graphql, fieldName: fieldName, parentType: parentType },
        statusCode: HttpStatus.OK,
        message: 'OK',
      };

      // Forma de responder en peticiones HTTP / GRAPHQL a través del Response capturado
      return next.handle().pipe(tap(() => manageLogsInterceptor(respuestaLog, context.getType<GqlContextType>())));
    }
  }
}
