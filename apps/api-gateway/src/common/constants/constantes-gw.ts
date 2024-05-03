import { Constantes } from '@bsc/core';

export class ConstantesGw extends Constantes {

  public static GATEWAY = {
    NAME: 'api-gateway',
  };

  public static ADMINISTRACION = {
    HOST: process.env.MS_ADMINISTRACION_HOST,
    PORT: parseInt(process.env.MS_ADMINISTRACION_PORT),
    NAME: 'ms-administracion',
    PATTERN: {
      USUARIO_COLLECTION: 'USUARIO_COLLECTION',
      USUARIO_BY_ID: 'USUARIO_BY_ID',
      USUARIO_CREATE: 'USUARIO_CREATE',
      USUARIO_UPDATE: 'USUARIO_UPDATE',
      USUARIO_DELETE: 'USUARIO_DELETE',

      MODULO_CREATE: 'MODULO_CREATE',
      MODULO_UPDATE: 'MODULO_UPDATE',
      MODULO_DELETE: 'MODULO_DELETE',
      MODULO_COLLECTION: 'MODULO_COLLECTION',
      MODULO_BY_ID: 'MODULO_BY_ID',

      MENU_CREATE: 'MENU_CREATE',
      MENU_UPDATE: 'MENU_UPDATE',
      MENU_DELETE: 'MENU_DELETE',
      MENU_COLLECTION: 'MENU_COLLECTION',
      MENU_BY_ID: 'MENU_BY_ID',

      ROL_CREATE: 'ROL_CREATE',
      ROL_UPDATE: 'ROL_UPDATE',
      ROL_DELETE: 'ROL_DELETE',
      ROL_COLLECTION: 'ROL_COLLECTION',
      ROL_BY_ID: 'ROL_BY_ID',
    },
  };

  public static AUTORIZACION = {
    HOST: process.env.MS_AUTORIZACION_HOST,
    PORT: parseInt(process.env.MS_AUTORIZACION_PORT),
    NAME: 'ms-autorizacion',
    PATTERN: {
      LOGIN:'LOGIN',
      PERFIL:'PERFIL',
      CAMBIO_PASSWORD:'CAMBIO_PASSWORD',
      MODULO_PERMISOS_ID:'MODULO_PERMISOS_ID'
    },
  };



}
