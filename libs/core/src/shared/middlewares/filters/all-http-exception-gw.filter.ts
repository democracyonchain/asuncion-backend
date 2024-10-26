import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { contextType } from '../../constants/enum/context-type';
import { manageLogsGraphql, manageLogsHttp } from '../../helpers/manage-logs';
import { RespuestaJWT } from '../../interfaces/respuesta-jwt.interface';
import { ContextGraphql, ContextHttp } from '../../interfaces/respuesta-log.interface';

@Catch(HttpException)
export class AllHttpExceptionGwFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //###############Filtro para excepciones HTTP en Gateway###########
    if (host.getType() === 'http') {
      // Contexto tipo Http /api rest
      const ctx = host.switchToHttp();

      //Usuario de Keycloak capturado obtenido por header token Bearer (Usando librería de keycloak)
      const userKC = ctx.getRequest().user as RespuestaJWT;

      // Captura de la respuesta a través del contexto
      const response = ctx.getResponse<Response>();

      // Captura de la solicitud a través del contexto
      const request = ctx.getRequest<Request>();

      // Captura del Status code del error
      const status = exception.getStatus();

      // Captura del mensaje de respuesta incluida en la excepción tipo HttpException
      const responseMessage = exception.getResponse() as any;

      // Captura del path del controlodor al cual está dirigida el request
      const url = request.url;

      // Captura de la IP a través de la request
      const ip = request.ip;

      // Captura del método Http usado (POST | GET | PUT | DELETE)
      const metodoHttp = request.method;

      // Captura del username unicamente si se hacen peticiones autenticado
      const username = userKC?.nombres || 'Usuario no autenticado';

      // Preparación del objeto tipo contexto para http (type, method, url)
      const contextRes: ContextHttp = { type: contextType.http, method: metodoHttp, url: url };

      // Uso del Helper manejo de logs para peticiones HTTP se incluye parametros (ip, contexto, status, message, username)
      manageLogsHttp(ip, contextRes, status, responseMessage, username);

      // Preparación del objeto de excepción estandarizado (error, path, timestamp)
      const excepcion = { error: responseMessage, path: request.url, timestamp: new Date() };

      // Forma de responder en peticiones HTTP / API Rest a través del Response capturado
      response.status(status).json(excepcion);

      //#############Filtro para excepciones GRAPHQL en Gateway###########
    } else if (host.getType<GqlContextType>() === 'graphql') {
      // Contexto tipo Http / Graphql
      const gqlHost = GqlArgumentsHost.create(host);

      //Usuario de Keycloak capturado obtenido por header token Bearer (Usando librería de keycloak)
      const userKC = gqlHost.getContext().req?.user as RespuestaJWT;

      // Captura de la solicitud a través del contexto
      const req = gqlHost.getContext().req as Request;

      // Captura del mensaje de respuesta incluida en la excepción tipo HttpException
      const responseMessage = exception.getResponse() as any;

      // Captura de la IP a través de la request
      const ip = req.ip;

      // Captura del Field GraphQL a cual se accede (nombre del Controlador de Query o Mutation)
      const fieldName = gqlHost.getInfo()?.fieldName;

      // Captura la operación GraphQL (Query | Mutation)
      const parentType = gqlHost.getInfo()?.parentType;

      // Captura del estado de la petición
      const status = exception.getStatus();

      // Captura del username unicamente si se hacen peticiones autenticado
      const username = userKC?.nombres || 'Usuario no autenticado';

      // Preparación del objeto tipo contexto para http (type, method, url)
      const contextRes: ContextGraphql = { type: contextType.graphql, parentType: parentType, fieldName: fieldName };

      // Uso del Helper manejo de logs para peticiones GRAPHQL se incluye parametros (ip, contexto, status, message, username)
      manageLogsGraphql(ip, contextRes, status, responseMessage, username);

      // Forma de responder en peticiones HTTP / GRAPHQL a través del Response capturado
      return exception;
    }
  }
}
