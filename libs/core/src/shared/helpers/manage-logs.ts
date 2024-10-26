
import { HttpStatus, Logger } from '@nestjs/common';

import { Constantes } from '../constants/constantes';
import { ContextGraphql, ContextHttp, ContextRpc, RespuestaLog } from '../interfaces/respuesta-log.interface';

export function manageLogsHttp(
  ip: string,
  context: ContextHttp,
  status: number,
  responseMessage: any,
  username?: string,
) {
  const mensaje = prepareMessageResponse(responseMessage);
  const respuestaLog: RespuestaLog<ContextHttp> = {
    originIp: ip,
    userAuth: username,
    context: context,
    statusCode: status,
    message: mensaje,
  };
  //Username unicamente se captura en el Gateway por eso se elimina
  if (username) delete respuestaLog.userAuth;

  //Log error: Para excepciones Internal Server Error
  if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
    Logger.error(
      process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog),
      context.type.toUpperCase(),
    );
    return null;
  }
  //Log warning: Para el resto de excepciones
  Logger.warn(
    process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog),
    context.type.toUpperCase(),
  );
}

export function manageLogsGraphql(
  ip: string,
  context: ContextGraphql,
  status: number,
  responseMessage: any,
  username?: string,
) {
  const mensaje = prepareMessageResponse(responseMessage);
  const respuestaLog: RespuestaLog<ContextGraphql> = {
    originIp: ip,
    userAuth: username,
    context: context,
    statusCode: status,
    message: mensaje,
  };
  //Username unicamente se captura en el Gateway por eso se elimina
  if (username) delete respuestaLog.userAuth;

  //Log error: Para excepciones Internal Server Error
  if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
    Logger.error(
      process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog),
      context.type.toUpperCase(),
    );
    return null;
  }
  //Log warning: Para el resto de excepciones
  Logger.warn(
    process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog),
    context.type.toUpperCase(),
  );
}

export function manageLogsRpc(remoteAddress: string, context: ContextRpc, status: number, message: string) {
  const respuestaLog: RespuestaLog<ContextRpc> = {
    originIp: remoteAddress,
    context: context,
    statusCode: status,
    message: message,
  };

  if (!status) {
    Logger.error(Constantes.INTERNAL_SERVER_ERROR);
    return null;
  }

  if (status == HttpStatus.INTERNAL_SERVER_ERROR || message.toString().trim().toUpperCase().startsWith('ORA-12545')) {
    Logger.error(
      process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog),
      context.type.toUpperCase(),
    );
    return null;
  }

  Logger.warn(
    process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog),
    context.type.toUpperCase(),
  );
}

export function manageLogsInterceptor(respuestaLog: RespuestaLog<any>, context: string) {
  Logger.log(process.env.NODE_ENV == 'production' ? respuestaLog : JSON.stringify(respuestaLog), context.toUpperCase());
}

function prepareMessageResponse(responseMessage: any): string {
  //Preparación de los mensajes de error - En algunos casos la respuesta del error no es un objeto y solo es un string.
  const mensajeLog = responseMessage?.error ? responseMessage.error + ': ' : '';
  const respMessage = responseMessage ? responseMessage : Constantes.ERROR_DESCONOCIDO;
  return responseMessage?.message ? mensajeLog + responseMessage?.message : mensajeLog + respMessage;
}
